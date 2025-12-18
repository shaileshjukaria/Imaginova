import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import razorpay from "razorpay";
import transactionModel from "../models/transactionModel.js";
import crypto from "crypto";
import { sendVerificationEmail, sendWelcomeEmail } from "../config/email.js";

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
     
        if (!name || !email || !password) {
            return res.json({sucess:false, message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({sucess:false, message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        const userData = {
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiry,
            isVerified: false
        };

        const newUser = new userModel(userData);
        const user = await newUser.save();

        // Send verification email
        const emailResult = await sendVerificationEmail(email, name, verificationToken);
        
        if (!emailResult.success) {
            // Delete user if email fails to send
            await userModel.findByIdAndDelete(user._id);
            return res.json({sucess:false, message: "Failed to send verification email. Please try again." });
        }

        res.json({
            sucess:true, 
            message: "Registration successful! Please check your email to verify your account.",
            requiresVerification: true
        });
    } catch (error) {
        console.log(error);
        res.json({sucess:false, message: error.message  });
    }
}

    const loginUser = async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.json({sucess:false, message: "User not found" });
            }

            // Check if email is verified
            if (!user.isVerified) {
                return res.json({
                    sucess:false, 
                    message: "Please verify your email before logging in. Check your inbox for the verification link.",
                    requiresVerification: true
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = jwt.sign({id: user._id }, process.env.JWT_SECRET)
                res.json({sucess:true, token , user: {name: user.name}});

            }else{
                return res.json({sucess:false, message: "Invalid credentials" });
            }    

        } catch (error) {
            console.log(error);
        res.json({sucess:false, message: error.message  });

        }
    }

    const userCredits = async (req, res) => {
        try {
            const { userId } = req;

            const user = await userModel.findById(userId);
            res.json({sucess:true, credits: user.creditBalance || 0, 
                user:{name: user.name}});
            
        } catch (error) {
            console.log(error);
        res.json({sucess:false, message: error.message  });
            
        }
    }

    const razorpayInstance = new razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const paymentRazorpay = async (req, res) => {
        try {
            const {planId} = req.body;
            const userId = req.userId;

            const userData = await userModel.findById(userId);
            if(!userId || !planId){
                return res.json({success:false, message: "Missing Details" });
            }

            let credits, plan, amount, date;

            switch(planId){
                case 'Basic':
                    plan = 'Basic';
                    credits = 100;
                    amount = 199;
                    break;

                case 'Advanced':
                    plan = 'Advanced';
                    credits = 400;
                    amount = 599;
                    break;

                case 'Business':
                    plan = 'Business';
                    credits = 2500;
                    amount = 2949;
                    break;    

                 default:
                    return res.json({success:false, message: "Invalid Plan" });   


            }

            date = Date.now();

            const transactionData = {
                userId,
                plan,
                amount,
                credits,
                date,
            };  

            const newTransaction = await transactionModel.create(transactionData);

            const options = {
                amount: amount * 100,
                currency: process.env.CURRENCY,
                receipt: newTransaction._id,
            };

            await razorpayInstance.orders.create(options,(error,order)=>{
                if(error){
                    console.log(error);
                    return res.json({success:false, message: error });
                }
                res.json({success:true, order });
                
        })

        } catch (error) {
            console.log(error);
        res.json({success:false, message: error.message  });
        }
    }

    const verifyRazorpay = async (req, res) => {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
            const userId = req.userId;

            console.log('Verifying payment:', { razorpay_order_id, razorpay_payment_id, userId });

            if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
                return res.json({success:false, message: "Missing payment details"});
            }

            // Verify signature
            const sign = razorpay_order_id + "|" + razorpay_payment_id;
            const expectedSign = crypto
                .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                .update(sign.toString())
                .digest("hex");

            console.log('Signature match:', razorpay_signature === expectedSign);

            if (razorpay_signature === expectedSign) {
                // Payment is verified
                const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
                console.log('Order info:', orderInfo);
                
                if(orderInfo.status === 'paid') {
                    // Find the transaction
                    const transactionData = await transactionModel.findById(orderInfo.receipt);
                    console.log('Transaction data:', transactionData);
                    
                    if(!transactionData) {
                        return res.json({success:false, message: "Transaction not found"});
                    }

                    if(transactionData.payment) {
                        return res.json({success:false, message: "Payment already processed"});
                    }

                    // Update transaction
                    transactionData.payment = true;
                    await transactionData.save();

                    // Update user credits
                    const userData = await userModel.findById(userId);
                    const creditBalance = userData.creditBalance + transactionData.credits;
                    await userModel.findByIdAndUpdate(userId, {creditBalance});

                    console.log('Credits added successfully. New balance:', creditBalance);
                    res.json({success:true, message: "Credits Added"});
                } else {
                    res.json({success:false, message: "Payment not completed"});
                }
            } else {
                res.json({success:false, message: "Invalid signature"});
            }
        } catch (error) {
            console.log('Verify payment error:', error);
            res.json({success:false, message: error.message});
        }
    }

    const verifyEmail = async (req, res) => {
        try {
            const { token } = req.query;
            
            if (!token) {
                return res.json({success:false, message: "Verification token is required" });
            }

            // Find user with this token
            const user = await userModel.findOne({ 
                verificationToken: token,
                verificationTokenExpiry: { $gt: Date.now() }
            });

            if (!user) {
                return res.json({success:false, message: "Invalid or expired verification token" });
            }

            // Update user as verified
            user.isVerified = true;
            user.verificationToken = undefined;
            user.verificationTokenExpiry = undefined;
            await user.save();

            // Send welcome email
            await sendWelcomeEmail(user.email, user.name);

            res.json({success:true, message: "Email verified successfully! You can now login." });

        } catch (error) {
            console.log(error);
            res.json({success:false, message: error.message });
        }
    }

    const resendVerificationEmail = async (req, res) => {
        try {
            const { email } = req.body;
            
            if (!email) {
                return res.json({success:false, message: "Email is required" });
            }

            const user = await userModel.findOne({ email });
            
            if (!user) {
                return res.json({success:false, message: "User not found" });
            }

            if (user.isVerified) {
                return res.json({success:false, message: "Email is already verified" });
            }

            // Generate new verification token
            const verificationToken = crypto.randomBytes(32).toString('hex');
            const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

            user.verificationToken = verificationToken;
            user.verificationTokenExpiry = verificationTokenExpiry;
            await user.save();

            // Send verification email
            const emailResult = await sendVerificationEmail(email, user.name, verificationToken);
            
            if (!emailResult.success) {
                return res.json({success:false, message: "Failed to send verification email. Please try again." });
            }

            res.json({success:true, message: "Verification email sent! Please check your inbox." });

        } catch (error) {
            console.log(error);
            res.json({success:false, message: error.message });
        }
    }

    export { registerUser, loginUser , userCredits, paymentRazorpay, verifyRazorpay, verifyEmail, resendVerificationEmail };