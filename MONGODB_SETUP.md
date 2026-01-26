# MongoDB Installation Guide for Windows

## Quick Install Options

### Option 1: Install MongoDB Community Server (Recommended)

1. **Download MongoDB**:
   - Go to: https://www.mongodb.com/try/download/community
   - Version: 7.0 or later
   - Platform: Windows
   - Package: MSI installer

2. **Run the Installer**:
   - Double-click the downloaded `.msi` file
   - Choose "Complete" installation
   - **Important**: Check "Install MongoDB as a Service"
   - Check "Install MongoDB Compass" (GUI tool - optional but helpful)
   - Click "Install"

3. **Verify Installation**:
   ```powershell
   mongod --version
   ```

4. **Start MongoDB Service**:
   ```powershell
   net start MongoDB
   ```

5. **Run Your Chat App**:
   ```powershell
   npm run dev-all
   ```

---

## Option 2: Use MongoDB Atlas (Cloud - Free Tier)

If you don't want to install MongoDB locally, use the free cloud version:

### Step 1: Create MongoDB Atlas Account

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account
3. Create a new cluster (choose FREE tier - M0)
4. Wait 3-5 minutes for cluster creation

### Step 2: Configure Database Access

1. In Atlas dashboard, go to "Database Access"
2. Click "Add New Database User"
3. Create username and password (save these!)
4. Set privileges to "Atlas Admin" or "Read and write to any database"
5. Click "Add User"

### Step 3: Configure Network Access

1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### Step 4: Get Connection String

1. Go to "Database" → Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 5: Update Your .env File

Edit `d:\Anoop\M Tech Course\2nd semenster\OSS\Individual case study\Realtime-chat-app\.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/realtime-chat?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_change_this
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

**Replace**:
- `your_username` with your Atlas username
- `your_password` with your Atlas password
- `cluster0.xxxxx` with your actual cluster address

### Step 6: Run Your App

```powershell
npm run dev-all
```

---

## Option 3: Use Docker (If you have Docker installed)

```powershell
# Run MongoDB in Docker container
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Run your app
npm run dev-all
```

---

## Troubleshooting

### "mongod not recognized" after installation
- Add MongoDB to PATH:
  - Default location: `C:\Program Files\MongoDB\Server\7.0\bin`
  - Add to System Environment Variables
  - Restart PowerShell

### "Service MongoDB not found"
- MongoDB wasn't installed as a service
- Run manually: `mongod --dbpath C:\data\db`
- Or reinstall and check "Install as Service"

### Connection still fails
- Check MongoDB is running: `net start MongoDB`
- Check port 27017 is not blocked by firewall
- Verify connection string in `.env` file

---

## Quick Recommendation

**For fastest setup**: Use MongoDB Atlas (Option 2) - it's cloud-based, requires no local installation, and has a generous free tier perfect for development and learning.

**For production/offline work**: Install MongoDB locally (Option 1) - gives you full control and works without internet.

---

## What to Do Now

Choose one option above and follow the steps. Once MongoDB is running or configured, restart your application with:

```powershell
npm run dev-all
```

The application will then connect successfully! 🚀
