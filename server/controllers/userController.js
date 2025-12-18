import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import razorpay from "razorpay";
import transactionModel from "../models/transactionModel.js";
import crypto from "crypto";
import { sendVerificationEmail, sendWelcomeEmail } from "../config/email.js";

const registerUser = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
     
        if (!name || !username || !email || !password) {
            return res.json({sucess:false, message: "All fields are required" });
        }

        // Validate password strength
        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.json({sucess:false, message: "Password must be at least 8 characters long and contain at least one special character" });
        }

        // Check if user already exists with email or username
        const existingEmail = await userModel.findOne({ email });
        if (existingEmail) {
            return res.json({sucess:false, message: "Email already exists" });
        }

        const existingUsername = await userModel.findOne({ username });
        if (existingUsername) {
            return res.json({sucess:false, message: "Username already taken" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            username,
            email,
            password: hashedPassword,
            isVerified: true // Auto-verify users
        };

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({id: user._id }, process.env.JWT_SECRET);
        res.json({
            sucess:true, 
            token,
            user: {name: user.name},
            message: "Registration successful!"
        });
    } catch (error) {
        console.log(error);
        res.json({sucess:false, message: error.message  });
    }
}

    const loginUser = async (req, res) => {
        try {
            const { emailOrUsername, password } = req.body;
            
            // Check if login is with email or username
            const user = await userModel.findOne({
                $or: [
                    { email: emailOrUsername },
                    { username: emailOrUsername }
                ]
            });
            
            if (!user) {
                return res.json({sucess:false, message: "User not found" });
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

    const checkUsernameAvailability = async (req, res) => {
        try {
            const { username } = req.query;
            
            if (!username) {
                return res.json({success:false, message: "Username is required" });
            }

            const existingUser = await userModel.findOne({ username });
            
            if (existingUser) {
                return res.json({success:false, available: false, message: "Username already taken" });
            }

            res.json({success:true, available: true, message: "Username is available" });

        } catch (error) {
            console.log(error);
            res.json({success:false, message: error.message });
        }
    }

    const googleAuth = async (req, res) => {
        try {
            const { email, name, googleId, profilePicture } = req.body;
            
            if (!email || !googleId) {
                return res.json({sucess:false, message: "Missing required fields" });
            }

            // Check if user already exists with this Google ID
            let user = await userModel.findOne({ googleId });
            
            if (user) {
                // User exists, log them in
                const token = jwt.sign({id: user._id }, process.env.JWT_SECRET);
                return res.json({sucess:true, token, user: {name: user.name}});
            }

            // Check if user exists with this email
            user = await userModel.findOne({ email });
            
            if (user) {
                // Link Google account to existing user
                user.googleId = googleId;
                if (profilePicture) user.profilePicture = profilePicture;
                user.isVerified = true; // Google accounts are pre-verified
                await user.save();
                
                const token = jwt.sign({id: user._id }, process.env.JWT_SECRET);
                return res.json({sucess:true, token, user: {name: user.name}});
            }

            // Create new user
            // Generate unique username from email
            let username = email.split('@')[0];
            let usernameExists = await userModel.findOne({ username });
            let counter = 1;
            
            while (usernameExists) {
                username = `${email.split('@')[0]}${counter}`;
                usernameExists = await userModel.findOne({ username });
                counter++;
            }

            const newUser = new userModel({
                name,
                username,
                email,
                googleId,
                profilePicture,
                isVerified: true, // Google accounts are pre-verified
                creditBalance: 5
            });

            await newUser.save();
            
            const token = jwt.sign({id: newUser._id }, process.env.JWT_SECRET);
            res.json({sucess:true, token, user: {name: newUser.name}});

        } catch (error) {
            console.log(error);
            res.json({sucess:false, message: error.message });
        }
    }

    export { registerUser, loginUser , userCredits, paymentRazorpay, verifyRazorpay, verifyEmail, resendVerificationEmail, checkUsernameAvailability, googleAuth };