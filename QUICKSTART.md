# Quick Start Guide

## Prerequisites Checklist

Before running the application, ensure you have:

- [ ] **Node.js** (v14+) installed - Check with: `node --version`
- [ ] **npm** installed - Check with: `npm --version`
- [ ] **MongoDB** installed and running - Check with: `mongod --version`
- [ ] **Git** installed (for version control)

## Installation Steps

### Step 1: Install Dependencies

Open PowerShell/Terminal in the project root and run:

```powershell
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

Or use the shortcut:
```powershell
npm run install-all
```

### Step 2: Configure Environment

The `.env` file has been created for you. Update it with your settings:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/realtime-chat
JWT_SECRET=change_this_to_a_random_secure_string
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

**Important**: Change the `JWT_SECRET` to a random secure string!

### Step 3: Start MongoDB

#### On Windows:
```powershell
# If installed as a service
net start MongoDB

# Or start manually
mongod
```

#### On macOS/Linux:
```bash
# Using brew (macOS)
brew services start mongodb-community

# Or start manually
mongod
```

#### Using MongoDB Compass (GUI):
Just open MongoDB Compass and connect to `mongodb://localhost:27017`

### Step 4: Run the Application

#### Option A: Run Both Server and Client Together (Recommended for Development)

```powershell
npm run dev-all
```

This will start:
- Backend server on http://localhost:5000
- Frontend on http://localhost:3000

#### Option B: Run Separately

**Terminal 1 - Backend:**
```powershell
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
npm run client
```

### Step 5: Open the Application

Open your browser and go to: **http://localhost:3000**

## First Time Usage

1. **Register a new account**
   - Click "Register here" on the login page
   - Fill in username, email, and password
   - Click "Register"

2. **Create a chat room**
   - After logging in, click "+ Create Room"
   - Enter room name and description
   - Click "Create"

3. **Start chatting!**
   - Click "Join Room" on any room
   - Type a message and hit "Send"
   - Open another browser/incognito window to test real-time features

## Troubleshooting

### MongoDB Connection Error
- **Problem**: `MongooseServerSelectionError: connect ECONNREFUSED`
- **Solution**: Make sure MongoDB is running (`mongod` or `net start MongoDB`)

### Port Already in Use
- **Problem**: `Error: listen EADDRINUSE: address already in use :::5000`
- **Solution**: 
  - Change `PORT` in `.env` file
  - Or kill the process using that port

### Module Not Found Error
- **Problem**: `Error: Cannot find module 'express'`
- **Solution**: Run `npm install` in the project root and `npm install` in client folder

### React App Won't Start
- **Problem**: Frontend doesn't load
- **Solution**: 
  - Check if you're in the `client` folder
  - Run `npm install` in the client folder
  - Try deleting `node_modules` and `package-lock.json`, then run `npm install` again

### CORS Errors
- **Problem**: API requests blocked by CORS
- **Solution**: Make sure `CLIENT_URL` in `.env` matches your frontend URL

## Production Deployment

For production deployment instructions, see the [README.md](./README.md#-deployment) file.

## Need Help?

- Check the [README.md](./README.md) for detailed documentation
- Open an issue on GitHub
- Check the [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines

---

**Happy Coding! 🚀**
