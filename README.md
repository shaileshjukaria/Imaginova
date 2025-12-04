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

### 🔐 Authentication

* Secure sign-in with JWT
* User-specific generation history

---

## 🛠️ **Tech Stack**

### **Frontend**

* React.js / Next.js
* Tailwind CSS
* Zustand / Redux
* Framer Motion animations

### **Backend**

* Node.js + Express
* MongoDB / PostgreSQL
* Cloudinary / S3 for image storage
* JWT Auth

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

Create a `.env` file:

```
MONGO_URI=
JWT_SECRET=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
HUGGINGFACE_API_KEY=
```

### **Run Development Server**

```bash
npm run dev
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
GitHub: [https://github.com/shaileshjukaria](https://github.com/shaileshjukaria)

---

## ⭐ **Support**

If you like **Imaginova**, don’t forget to ⭐ the repo!

