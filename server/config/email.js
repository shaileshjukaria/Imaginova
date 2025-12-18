import nodemailer from 'nodemailer';

// Create email transporter
const createTransporter = () => {
    return nodemailer.createTransporter({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });
};

// Send verification email
export const sendVerificationEmail = async (email, name, verificationToken) => {
    try {
        const transporter = createTransporter();
        
        const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email?token=${verificationToken}`;
        
        const mailOptions = {
            from: `"Imaginova" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Verify Your Email - Imaginova',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #f97316;">Welcome to Imaginova!</h2>
                    <p>Hi ${name},</p>
                    <p>Thank you for registering with Imaginova. Please verify your email address to complete your registration.</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${verificationUrl}" 
                           style="background-color: #f97316; color: white; padding: 12px 30px; 
                                  text-decoration: none; border-radius: 25px; display: inline-block;">
                            Verify Email
                        </a>
                    </div>
                    <p>Or copy and paste this link in your browser:</p>
                    <p style="color: #666; word-break: break-all;">${verificationUrl}</p>
                    <p style="color: #888; font-size: 12px; margin-top: 30px;">
                        This link will expire in 24 hours. If you didn't create an account, please ignore this email.
                    </p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error('Error sending verification email:', error);
        return { success: false, error: error.message };
    }
};

// Send welcome email after verification
export const sendWelcomeEmail = async (email, name) => {
    try {
        const transporter = createTransporter();
        
        const mailOptions = {
            from: `"Imaginova" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Welcome to Imaginova - Email Verified!',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #f97316;">Email Verified Successfully! 🎉</h2>
                    <p>Hi ${name},</p>
                    <p>Your email has been verified successfully. You can now enjoy all the features of Imaginova!</p>
                    <p>You have received <strong>5 free credits</strong> to get started with AI image generation.</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}" 
                           style="background-color: #f97316; color: white; padding: 12px 30px; 
                                  text-decoration: none; border-radius: 25px; display: inline-block;">
                            Start Creating
                        </a>
                    </div>
                    <p>Happy creating!</p>
                    <p>The Imaginova Team</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error('Error sending welcome email:', error);
        return { success: false, error: error.message };
    }
};
