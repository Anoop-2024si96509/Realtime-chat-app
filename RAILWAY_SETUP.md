# 🚂 Railway Setup - Complete Step-by-Step Guide

## 📋 STEP 1: Create Railway Account

1. **Go to**: https://railway.app
2. **Click**: "Login with GitHub"
3. **Authorize**: Click "Authorize Railway" when prompted
4. Done! You're logged in

---

## 🎯 STEP 2: Create New Project

1. **In Railway dashboard**, click the **"New Project"** button (top right)
2. **Select**: "Deploy from GitHub repo"
3. **Choose your repository**: 
   - Search for `Realtime-chat-app`
   - Click on it to select
4. **Click**: "Deploy Now" button

⏳ **Wait 2-3 minutes** for the deployment to complete. You'll see:
- Building... → In Progress
- Then a green checkmark ✅ when complete

---

## ⚙️ STEP 3: Add Environment Variables

1. **In Railway dashboard**, click on your deployed service
2. **Go to the "Variables" tab**
3. **Add these environment variables** (paste exactly):

```
MONGODB_URI=mongodb+srv://2024si96509_db_user:OSNhOMP1KOuKBPpW@cluster0.6fdrypg.mongodb.net/realtime-chat?retryWrites=true&w=majority

JWT_SECRET=your_super_secret_key_change_this_to_random_string_12345

NODE_ENV=production

CLIENT_URL=https://placeholder.com

PORT=5000
```

**For now**, set `CLIENT_URL=https://placeholder.com` - we'll update it after deploying the frontend.

4. **Click "Apply" or "Save"** after each variable
5. Railway will **automatically redeploy** when you add variables

---

## 🌐 STEP 4: Get Your Backend URL

1. **In Railway**, go to **"Settings"** tab
2. **Find "Domains" section**
3. **Click "Generate Domain"** button
4. **Copy your URL** (looks like: `https://your-app.up.railway.app`)

📌 **SAVE THIS URL** - You'll need it for the frontend!

### ✅ Test Backend URL:
- Open your URL in browser
- Should show: `{"message":"Real-time Chat API Server"}`
- If you see this, your backend is working! ✅

---

## 📸 Visual Walkthrough

### Finding the Variables Tab:
```
Your Project → Your Service → Variables Tab → Add Key/Value
```

### Finding the Domains:
```
Your Project → Your Service → Settings Tab → Domains Section
```

---

## 🔄 What Happens Next:

1. ✅ Backend deployed on Railway
2. ⏳ You get a live URL
3. 🎨 Deploy frontend to Vercel (next step)
4. 🔗 Connect frontend to backend
5. 🚀 Chat app goes live!

---

## ⚠️ Troubleshooting

### Build Failed?
- Check Railway deployment logs
- Usually a missing dependency issue
- Try redeploying: Click "Deploy" → "Redeploy"

### Can't see domain?
- Go to Settings → scroll down to find "Domains"
- If no domain, click "Generate Domain" first

### Environment variables not applied?
- Make sure you clicked "Apply" or "Save"
- Railway will auto-redeploy with new variables

---

## 🎯 Next Steps:

1. **Create account on Railway** (using GitHub)
2. **Deploy project from GitHub**
3. **Add environment variables**
4. **Get your backend URL**
5. **Come back and run**: `.\deploy-helper.ps1`

---

**Let's get your backend live! 🚀**
