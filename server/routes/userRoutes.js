import express from 'express';
import {registerUser, loginUser, userCredits, paymentRazorpay, verifyRazorpay, verifyEmail, resendVerificationEmail, checkUsernameAvailability, googleAuth} from '../controllers/userController.js';
import userAuth from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/google-auth', googleAuth);
userRouter.get('/credits', userAuth , userCredits);
userRouter.post('/pay-razor', userAuth , paymentRazorpay);
userRouter.post('/verify-razor', userAuth , verifyRazorpay);
userRouter.get('/verify-email', verifyEmail);
userRouter.post('/resend-verification', resendVerificationEmail);
userRouter.get('/check-username', checkUsernameAvailability);

export default userRouter;

// http://localhost:4000/api/user/register
// http://localhost:4000/api/user/login
// http://localhost:4000/api/user/credits
// http://localhost:4000/api/user/verify-email
// http://localhost:4000/api/user/resend-verification