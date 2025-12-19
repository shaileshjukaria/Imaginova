# Imaginova Deployment Guide

This guide will help you deploy your Imaginova project so everyone can use it.

## Prerequisites

1. GitHub account
2. MongoDB Atlas account (for database)
3. Render/Railway account (for backend)
4. Vercel account (for frontend)
5. Razorpay account (for payments)

## Step 1: Prepare Your Code

### 1.1 Initialize Git Repository (if not already done)
```bash
git init
git add .
git commit -m "Initial commit"
```

### 1.2 Create GitHub Repository
1. Go to GitHub and create a new repository
2. Push your code:
```bash
git remote add origin YOUR_GITHUB_REPO_URL
git branch -M main
git push -u origin main
```

## Step 2: Deploy Backend (Render)

### 2.1 Create Render Account
- Go to [render.com](https://render.com) and sign up

### 2.2 Deploy Backend
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: imaginova-backend
   - **Root Directory**: `server`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 2.3 Add Environment Variables in Render
Go to Environment tab and add:
```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_random_secret_key_here
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CURRENCY=INR
CLIPDROP_API=your_clipdrop_api_key
PORT=4000
```

### 2.4 Get Backend URL
- After deployment, copy your backend URL (e.g., `https://imaginova-backend.onrender.com`)

## Step 3: Deploy Frontend (Vercel)

### 3.1 Create Vercel Account
- Go to [vercel.com](https://vercel.com) and sign up with GitHub

### 3.2 Deploy Frontend
1. Click "Add New..." → "Project"
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3.3 Add Environment Variables in Vercel
Go to Settings → Environment Variables and add:
```
VITE_BACKEND_URL=https://your-backend-url.onrender.com
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### 3.4 Redeploy
After adding environment variables, go to Deployments tab and redeploy the latest deployment.

## Step 4: MongoDB Atlas Setup

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Add IP whitelist (use `0.0.0.0/0` to allow all IPs)
5. Get connection string and add to backend environment variables

## Step 5: Razorpay Setup

> **📘 For detailed Razorpay setup instructions, see [RAZORPAY_SETUP.md](RAZORPAY_SETUP.md)**

### Quick Setup
1. Create account at [razorpay.com](https://razorpay.com)
2. Get Test/Live API keys from Dashboard
3. Add keys to environment variables (backend & frontend)
4. For production: Complete KYC verification

### Environment Variables Required
**Backend:**
```env
RAZORPAY_KEY_ID=rzp_test_xxx  # or rzp_live_xxx
RAZORPAY_KEY_SECRET=your_secret
CURRENCY=INR
```

**Frontend:**
```env
VITE_RAZORPAY_KEY_ID=rzp_test_xxx  # or rzp_live_xxx
```

See [RAZORPAY_SETUP.md](RAZORPAY_SETUP.md) for complete configuration guide.

## Alternative Backend Deployment Options

### Railway
1. Go to [railway.app](https://railway.app)
2. Create new project → Deploy from GitHub
3. Select your repository
4. Set root directory to `server`
5. Add environment variables
6. Deploy

### Heroku
1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create imaginova-backend`
4. Set buildpack: `heroku buildpacks:set heroku/nodejs`
5. Add environment variables: `heroku config:set KEY=VALUE`
6. Deploy: `git push heroku main`

## Step 6: Update CORS Settings

Update `server/server.js` to allow your frontend domain:

```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-frontend-domain.vercel.app'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

## Step 7: Test Your Deployment

1. Visit your Vercel frontend URL
2. Register/Login
3. Try generating an image
4. Test the payment flow
5. Check if credits are added

## Troubleshooting

### Backend Issues
- Check Render logs for errors
- Verify all environment variables are set
- Ensure MongoDB connection string is correct

### Frontend Issues
- Check browser console for errors
- Verify VITE_BACKEND_URL points to correct backend
- Clear browser cache and reload

### Payment Issues
- Verify Razorpay keys are correct
- Check if using Test Mode for testing
- Ensure webhook URL is configured (if using webhooks)

## Domain Setup (Optional)

### Custom Domain for Frontend
1. Buy a domain (Namecheap, GoDaddy, etc.)
2. In Vercel: Settings → Domains → Add Domain
3. Update DNS records as instructed

### Custom Domain for Backend
1. In Render: Settings → Custom Domain
2. Update DNS records as instructed
3. Update frontend VITE_BACKEND_URL

## Monitoring

- **Render**: Check logs in Dashboard
- **Vercel**: Check deployment logs and runtime logs
- **MongoDB**: Monitor usage in Atlas Dashboard

## Cost Estimation

- **Frontend (Vercel)**: Free for hobby projects
- **Backend (Render)**: Free tier available (sleeps after 15 min inactivity)
- **Database (MongoDB Atlas)**: Free tier (512MB storage)
- **Razorpay**: Transaction fees apply on payments

## Updates and Redeployment

### Automatic Deployment
Both Vercel and Render support automatic deployment:
1. Push code to GitHub
2. Services automatically detect changes and redeploy

### Manual Deployment
- **Vercel**: Go to Deployments → Redeploy
- **Render**: Go to Manual Deploy → Deploy latest commit

---

## Quick Checklist

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas cluster created
- [ ] Backend deployed on Render
- [ ] Backend environment variables added
- [ ] Frontend deployed on Vercel
- [ ] Frontend environment variables added
- [ ] CORS configured correctly
- [ ] Test payment flow working
- [ ] Custom domains configured (optional)

**Your app is now live! 🚀**
