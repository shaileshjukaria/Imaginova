<img width="834" height="199" alt="logo" src="https://github.com/user-attachments/assets/a9ac09b3-60cf-4835-aa56-8fa39cabe721" />

**Imaginova — AI Image Generation Platform**

Imaginova is a modern AI-powered image generation platform inspired by cutting-edge diffusion models and interactive creative tools.
It allows users to **generate, customize, upscale, and download AI-generated images** with a clean UI and smooth workflow — all inside a fast full-stack application.
<p align="center">
  <img src="https://github.com/user-attachments/assets/43c6bfab-9363-489c-8698-90054e9e6020" width="300" />
  <img src="https://github.com/user-attachments/assets/6f3c2850-5433-40c0-bd51-def799f0da3c" width="300" />
  <img src="https://github.com/user-attachments/assets/4d4338c8-8a27-4d00-9150-963f0e57d7b7" width="300" />
</p>

---

## ✨ **Features**

### 🖼️ AI Image Generation

* Generate high-quality images using text prompts
* Multiple model presets (Portrait, Realistic, Anime, Logo, etc.)
* Adjustable parameters: aspect ratio, steps, guidance scale

### 🎨 Image Editing Tools

* Regenerate, refine, or enhance images
* Add variations, upscale, or sharpen

### 📁 Image Gallery & History

* View all previously generated images
* Automatic save for each session
* Download in HD

### ⚡ Modern Frontend

* Clean UI inspired by professional AI tools
* Fast interaction & optimized rendering
* Responsive on all screen sizes

### 🔐 Authentication & Email Verification

* Secure sign-in with JWT
* **Email verification required** - Only verified emails can login/signup
* User-specific generation history
* Password encryption with bcrypt
* Resend verification email functionality

---

## 🛠️ **Tech Stack**

### **Frontend**

* React.js / Next.js
* Tailwind CSS
* Zustand / Redux
* Framer Motion animations

### **Backend**

* Node.js + Express
* MongoDB (Mongoose)
* Razorpay (Payment Integration)
* Cloudinary / Clipdrop API
* Nodemailer (Email Service)
* JWT Auth + bcrypt

### **AI Model Integration**

* Stable Diffusion / Flux
* Replicate / HuggingFace Inference API
* Custom inference server

---

## 🚀 **Getting Started**

### **Clone the Repo**

```bash
git clone https://github.com/shaileshjukaria/Imaginova.git
cd Imaginova
```

### **Install Dependencies**

```bash
npm install
```

### **Environment Variables**

Create a `.env` file in the `server` directory:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
FRONTEND_URL=http://localhost:5173

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CURRENCY=INR

# Clipdrop API
CLIPDROP_API=your_clipdrop_api_key

# Server Port
PORT=4000
```

#### **Setting Up Gmail for Email Verification:**
1. Enable 2-Step Verification on your Google Account
2. Go to [Google Account Security](https://myaccount.google.com/security)
3. Under "2-Step Verification", find "App passwords"
4. Generate a new app password for "Mail"
5. Copy the 16-character password and use it as `EMAIL_PASSWORD`

### **Run Development Server**

**Server:**
```bash
cd server
npm install
npm run server
```

**Client:**
```bash
cd client
npm install
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

---

## 📧 **Email Verification System**

### **How It Works**

1. **User Registration**: User signs up with name, email, and password
2. **Verification Email Sent**: System sends a verification link to the user's email
3. **Email Verification**: User clicks the link to verify their email address
4. **Account Activated**: After verification, user can login normally

### **Key Features**

- ✉️ Automated verification emails with branded templates
- ⏰ Verification links expire after 24 hours
- 🔄 Resend verification email option
- 🎉 Welcome email after successful verification
- 🔒 Cannot login without verified email

### **API Endpoints**

- `POST /api/user/register` - Register new user (sends verification email)
- `POST /api/user/login` - Login (requires verified email)
- `GET /api/user/verify-email?token=...` - Verify email address
- `POST /api/user/resend-verification` - Resend verification email

### **Testing the Email Flow**

1. Register a new user
2. Check your email inbox for verification link
3. Click the verification link
4. You'll be redirected to the verification success page
5. Now you can login with your verified account

### **Troubleshooting Email Issues**

**Email not sending?**
- Verify `EMAIL_USER` and `EMAIL_PASSWORD` in `.env`
- For Gmail, ensure you're using App Password (not regular password)
- Check that 2-Step Verification is enabled
- Look for errors in server console

**Verification link not working?**
- Check that `FRONTEND_URL` matches your client URL
- Ensure the token hasn't expired (24 hours validity)
- Verify the route is properly configured

**Existing Users Migration:**
If you have existing users, mark them as verified by running this in MongoDB:
```javascript
db.users.updateMany(
  { isVerified: { $exists: false } },
  { $set: { isVerified: true } }
);
```



## 🧩 **Core Modules**

### **1. Prompt Engine**

Handles:

* prompt → model request
* parameter parsing
* safety checks

### **2. Image Processor**

Handles:

* upscaling
* format conversion
* quality optimization

### **3. Gallery Module**

Stores:

* generated images
* metadata
* user history

---

## 🤖 **How It Works**

1. User enters a prompt
2. The backend sends prompt → AI model
3. AI generates image(s)
4. Images processed & stored
5. UI displays results in gallery

Flowchart diagram :

```
Prompt → Backend API → AI Model → Image Output → Processor → Database → Frontend Gallery
```

---

## 🗺️ **Future Enhancements**

* Image inpainting / outpainting
* Style training & custom LoRAs
* Drag-and-drop canvas editor
* Community feed + likes
* Mobile app version

---

## 👤 **Author**

**Shailesh Jukaria**
Full Stack Developer | AI + Web Dev
GitHub: [https://github.com/shaileshjukaria](https://shaileshjukaria.netlify.app)

---

## ⭐ **Support**

If you like **Imaginova**, don’t forget to ⭐ the repo!

