# Railway Environment Variables Setup

## ✅ Build Issue Fixed!

The package.json has been updated and pushed to GitHub. The build should now work.

---

## 🔧 Next Step: Add Environment Variables to Railway

### Step 1: Go to Railway Dashboard

1. Visit https://railway.app
2. Go to your **Realtime-Chat-App** project
3. Click on the **Backend** service

### Step 2: Add Environment Variables

Click on **Variables** tab and add these 4 environment variables:

| Variable | Value |
|----------|-------|
| `NODE_ENV` | `production` |
| `MONGODB_URI` | `mongodb+srv://2024si96509_db_user:OSNhOMP1KOuKBPpW@cluster0.6fdrypg.mongodb.net/realtime-chat?retryWrites=true&w=majority` |
| `JWT_SECRET` | `your_super_secret_jwt_key_12345` (or any random string) |
| `PORT` | `5000` |

> Note: The `CLIENT_URL` can be added later once you deploy the frontend to Vercel

### Step 3: Redeploy

1. Click **Redeploy** button
2. Wait 2-3 minutes for build to complete
3. You should see **✅ Success** status

---

## 🎯 After Deployment

Once deployment succeeds:

1. Go to **Settings** tab
2. Look for **Domains** section
3. Copy the domain (usually looks like: `your-app-production.railway.app`)
4. This is your **BACKEND_URL** 
5. Save it - you'll need it for Vercel frontend deployment

---

## 📋 Checklist

- [ ] Go to Railway dashboard
- [ ] Click Variables tab
- [ ] Add NODE_ENV = production
- [ ] Add MONGODB_URI = (connection string from above)
- [ ] Add JWT_SECRET = (any random string)
- [ ] Add PORT = 5000
- [ ] Click Redeploy
- [ ] Wait for ✅ Success status
- [ ] Copy the domain from Settings → Domains
- [ ] Save domain URL for Vercel deployment

---

**Once complete, reply with the domain URL and we'll deploy the frontend to Vercel! 🚀**
