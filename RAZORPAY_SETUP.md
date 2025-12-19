# Razorpay Integration Setup Guide

## Overview
This document provides a complete guide to set up Razorpay payment integration for Imaginova permanently.

## Prerequisites
- Razorpay account (Sign up at https://razorpay.com/)
- Business/Personal details for KYC verification
- Bank account details for settlements

---

## Part 1: Razorpay Account Setup

### Step 1: Create Razorpay Account
1. Go to https://razorpay.com/
2. Click "Sign Up" and create an account
3. Verify your email address
4. Complete the onboarding process

### Step 2: Get API Keys

#### For Testing (Development)
1. Log in to Razorpay Dashboard
2. Navigate to **Settings** → **API Keys**
3. Click **Generate Test Key**
4. Copy both:
   - **Key ID** (starts with `rzp_test_`)
   - **Key Secret** (keep this secret!)

#### For Production (Live)
1. Complete KYC verification (see Step 3)
2. After approval, go to **Settings** → **API Keys**
3. Click **Generate Live Key**
4. Copy both:
   - **Key ID** (starts with `rzp_live_`)
   - **Key Secret** (keep this secret!)

### Step 3: KYC Verification (Required for Production)
1. Navigate to **Settings** → **Account & Settings**
2. Click on **KYC Details**
3. Provide required information:
   - Business name and type
   - PAN card details
   - Bank account details
   - Business address
   - Owner/Director details
4. Upload required documents:
   - PAN card
   - Address proof
   - Bank statement/Cancelled cheque
   - Business registration documents (if applicable)
5. Submit for verification (usually takes 1-3 business days)

---

## Part 2: Environment Configuration

### Backend Setup (Server)

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Create/Update `.env` file** with Razorpay credentials:
   ```env
   # Razorpay Configuration
   RAZORPAY_KEY_ID=rzp_test_YourKeyIdHere     # Or rzp_live_ for production
   RAZORPAY_KEY_SECRET=YourKeySecretHere
   CURRENCY=INR
   
   # Other required variables
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=4000
   FRONTEND_URL=http://localhost:5173        # Or your production URL
   EMAIL_USER=teamshaileshjukaria@outlook.com
   EMAIL_PASSWORD=your-outlook-app-password
   CLIPDROP_API=your_clipdrop_api_key
   ```

3. **Verify Razorpay package is installed:**
   ```bash
   npm install razorpay
   ```

### Frontend Setup (Client)

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Create/Update `.env` file:**
   ```env
   # Backend URL
   VITE_BACKEND_URL=http://localhost:4000    # Or your production backend URL
   
   # Razorpay Public Key (Safe to expose)
   VITE_RAZORPAY_KEY_ID=rzp_test_YourKeyIdHere    # Or rzp_live_ for production
   ```

3. **Verify Razorpay script is loaded in `index.html`:**
   - The file already includes: `<script src="https://checkout.razorpay.com/v1/checkout.js"></script>`
   - This loads the Razorpay checkout library

---

## Part 3: Vercel Deployment Configuration

### Environment Variables on Vercel

1. **Go to Vercel Dashboard**
2. **Select your project**
3. **Navigate to Settings → Environment Variables**

#### Add Backend Variables (if deploying server on Vercel):
```
RAZORPAY_KEY_ID=rzp_live_YourProductionKeyId
RAZORPAY_KEY_SECRET=YourProductionKeySecret
CURRENCY=INR
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
FRONTEND_URL=https://your-domain.vercel.app
EMAIL_USER=teamshaileshjukaria@outlook.com
EMAIL_PASSWORD=your_outlook_app_password
CLIPDROP_API=your_clipdrop_api_key
PORT=4000
```

#### Add Frontend Variables:
```
VITE_BACKEND_URL=https://your-backend-url.com
VITE_RAZORPAY_KEY_ID=rzp_live_YourProductionKeyId
```

4. **Apply to All Environments** (or specific ones as needed)
5. **Redeploy** the application for changes to take effect

---

## Part 4: Testing Razorpay Integration

### Test Mode (Development)

1. **Use Test Keys** in your `.env` files
2. **Test Payment Flow:**
   - Go to Buy Credits page
   - Select a plan
   - Click "Purchase"
   - Razorpay checkout will open

3. **Use Test Card Details:**
   ```
   Card Number: 4111 1111 1111 1111
   CVV: Any 3 digits
   Expiry: Any future date
   Name: Any name
   ```

4. **Other Test Methods:**
   - **UPI:** success@razorpay
   - **Net Banking:** Select any bank, use "success" as credentials
   - **Wallet:** Select any wallet, complete payment

5. **Verify Payment Success:**
   - Credits should be added to user account
   - Transaction should be recorded in database
   - Check Razorpay Dashboard for payment details

### Production Testing

1. **Switch to Live Keys** in production environment
2. **Make a small real payment** (e.g., Basic plan)
3. **Verify:**
   - Payment is received in Razorpay Dashboard
   - Credits are added correctly
   - Transaction is recorded
   - Money is settled to your bank account (T+3 days typically)

---

## Part 5: Webhook Setup (Optional but Recommended)

Webhooks ensure payment verification even if the user closes the browser.

### Setup Webhook on Razorpay

1. Go to **Settings** → **Webhooks**
2. Click **Create New Webhook**
3. **Webhook URL:** `https://your-backend-url.com/api/user/webhook`
4. **Secret:** Generate a strong secret and save it
5. **Events to Subscribe:**
   - `payment.authorized`
   - `payment.captured`
   - `payment.failed`
   - `order.paid`

6. **Save Webhook**

### Add Webhook Handler in Backend

Create a new route in `server/routes/userRoutes.js`:

```javascript
import express from 'express';
import crypto from 'crypto';

const router = express.Router();

router.post('/webhook', async (req, res) => {
    try {
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
        const signature = req.headers['x-razorpay-signature'];
        
        // Verify webhook signature
        const expectedSignature = crypto
            .createHmac('sha256', webhookSecret)
            .update(JSON.stringify(req.body))
            .digest('hex');
        
        if (signature === expectedSignature) {
            // Process webhook event
            const event = req.body.event;
            const paymentEntity = req.body.payload.payment.entity;
            
            if (event === 'payment.captured') {
                // Handle successful payment
                // Update user credits, transaction status, etc.
            }
            
            res.json({ status: 'ok' });
        } else {
            res.status(400).json({ error: 'Invalid signature' });
        }
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
});

export default router;
```

---

## Part 6: Security Best Practices

### 1. Never Expose Key Secret
- ✅ Keep `RAZORPAY_KEY_SECRET` only in backend `.env`
- ❌ Never commit to Git
- ❌ Never expose in frontend code
- ✅ Add `.env` to `.gitignore`

### 2. Validate on Backend
- All payment verifications happen on the server
- Never trust client-side payment confirmations
- Always verify signature using Razorpay SDK

### 3. Use HTTPS in Production
- Required for Razorpay checkout to work properly
- Vercel provides HTTPS by default

### 4. Store Test/Live Keys Separately
- Use test keys in development
- Use live keys only in production
- Never mix test and live keys

---

## Part 7: Common Issues & Solutions

### Issue 1: "Razorpay is not defined"
**Solution:** Ensure `checkout.js` script is loaded in `index.html`:
```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

### Issue 2: Payment Success but Credits Not Added
**Solution:** 
- Check backend logs for verification errors
- Verify signature is calculated correctly
- Ensure transaction model is updated properly
- Check database connectivity

### Issue 3: "Invalid Key ID"
**Solution:**
- Verify `RAZORPAY_KEY_ID` matches the key in Razorpay Dashboard
- Ensure you're using the correct mode (test/live)
- Check for extra spaces or quotes in `.env` file

### Issue 4: 404 Error on Payment Pages
**Solution:** 
- This has been fixed with updated `vercel.json` configuration
- Ensure client-side routing is properly configured
- Redeploy to Vercel after changes

### Issue 5: Payment Gateway Not Opening
**Solution:**
- Check browser console for JavaScript errors
- Verify Razorpay key is correctly set in frontend `.env`
- Ensure user is logged in before attempting payment
- Check network tab for API call failures

---

## Part 8: Monitoring & Maintenance

### 1. Monitor Razorpay Dashboard
- Check daily/weekly transaction reports
- Review failed payments
- Monitor settlement status

### 2. Database Monitoring
- Regularly check transaction records
- Verify credit balance accuracy
- Monitor for duplicate transactions

### 3. Error Logging
- Implement proper logging for payment flows
- Alert on payment verification failures
- Track API response times

### 4. Regular Updates
- Keep Razorpay SDK updated: `npm update razorpay`
- Monitor Razorpay API changelog for breaking changes
- Test payment flow after updates

---

## Part 9: Going Live Checklist

Before switching to live mode:

- [ ] Complete Razorpay KYC verification
- [ ] Obtain live API keys
- [ ] Update environment variables (backend & frontend)
- [ ] Test with real payment (small amount)
- [ ] Verify credits are added correctly
- [ ] Check settlement in bank account (2-3 days)
- [ ] Set up webhook for reliability
- [ ] Enable necessary payment methods in Razorpay Dashboard
- [ ] Set up pricing correctly (₹199, ₹599, ₹2949)
- [ ] Test all three plans (Basic, Advanced, Business)
- [ ] Update Terms of Service with payment terms
- [ ] Configure settlement preferences in Razorpay
- [ ] Set up email notifications for failed payments
- [ ] Document emergency procedures
- [ ] Train support team on payment issues

---

## Part 10: Support & Resources

### Razorpay Resources
- **Documentation:** https://razorpay.com/docs/
- **API Reference:** https://razorpay.com/docs/api/
- **Support:** support@razorpay.com
- **Community:** https://community.razorpay.com/

### Imaginova Support
- **Email:** teamshaileshjukaria@outlook.com
- **Technical Issues:** Check server logs and Razorpay dashboard

### Quick Reference
- **Test Key Prefix:** `rzp_test_`
- **Live Key Prefix:** `rzp_live_`
- **Currency:** INR (Indian Rupee)
- **Settlement Time:** T+3 business days (typically)
- **Transaction Fee:** ~2% + GST (check Razorpay pricing)

---

## Conclusion

This guide ensures Razorpay is permanently integrated and properly configured for Imaginova. Follow each step carefully, especially when transitioning from test to production mode. Always test thoroughly before going live with real payments.

For any issues not covered here, refer to Razorpay's official documentation or contact their support team.
