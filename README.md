# Real-time Chat Application 💬

A full-stack real-time chat application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and Socket.io for WebSocket communication.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)

## 🏗️ Architecture

### System Architecture Overview

```
┌─────────────────┐         WebSocket/HTTP        ┌─────────────────┐
│                 │◄──────────────────────────────►│                 │
│  React Client   │         Socket.io              │  Express Server │
│   (Frontend)    │         REST API               │   (Backend)     │
│                 │                                 │                 │
└─────────────────┘                                 └────────┬────────┘
                                                             │
                                                             │ Mongoose
                                                             │
                                                    ┌────────▼────────┐
                                                    │                 │
                                                    │    MongoDB      │
                                                    │   (Database)    │
                                                    │                 │
                                                    └─────────────────┘
```

### Technology Stack

#### Frontend
- **React.js 18** - UI library for building interactive interfaces
- **Socket.io-client** - Real-time bidirectional event-based communication
- **Axios** - HTTP client for REST API calls
- **React Router** - Client-side routing
- **CSS3** - Styling with modern gradient designs

#### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **Socket.io** - WebSocket library for real-time communication
- **Mongoose** - MongoDB object modeling tool
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

#### Database
- **MongoDB** - NoSQL document database
  - **Collections:**
    - `users` - User accounts and profiles
    - `messages` - Chat messages with timestamps
    - `rooms` - Chat rooms with members

## ✨ Features

### Core Features
- ✅ **User Authentication** - Register, login, logout with JWT
- ✅ **Real-time Messaging** - Instant message delivery using WebSocket
- ✅ **Multiple Chat Rooms** - Create and join different chat rooms
- ✅ **Online Users** - See who's currently in the room
- ✅ **Typing Indicators** - Know when someone is typing
- ✅ **Message History** - Persistent message storage in MongoDB
- ✅ **User Presence** - Join/leave notifications
- ✅ **Responsive Design** - Works on desktop and mobile devices

### Security Features
- 🔒 Password hashing with bcrypt
- 🔒 JWT-based authentication
- 🔒 Protected API routes
- 🔒 Input validation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** - Comes with Node.js

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/realtime-chat-app.git
cd realtime-chat-app
```

### 2. Install dependencies

Install both server and client dependencies:

```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

Or use the convenience script:

```bash
npm run install-all
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/realtime-chat
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# On Windows (if installed as service)
net start MongoDB

# On macOS/Linux
mongod

# Or using MongoDB Compass (GUI)
```

### 5. Run the application

#### Development mode (runs both server and client):

```bash
npm run dev-all
```

#### Or run separately:

**Terminal 1 - Backend:**
```bash
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run client
```

#### Production mode:

```bash
# Build the React app
cd client
npm run build
cd ..

# Start the server
npm start
```

The application will be available at:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## 📁 Project Structure

```
realtime-chat-app/
├── client/                      # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.js
│   │   │   │   └── Register.js
│   │   │   └── Chat/
│   │   │       ├── ChatRoom.js
│   │   │       ├── ChatRoom.css
│   │   │       ├── RoomList.js
│   │   │       └── RoomList.css
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
├── server/                      # Express backend
│   ├── models/
│   │   ├── User.js             # User schema
│   │   ├── Message.js          # Message schema
│   │   └── Room.js             # Room schema
│   ├── routes/
│   │   ├── auth.js             # Authentication routes
│   │   ├── messages.js         # Message routes
│   │   └── rooms.js            # Room routes
│   ├── middleware/
│   │   └── auth.js             # JWT authentication middleware
│   └── server.js               # Main server file
│
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore file
├── package.json                 # Server dependencies
└── README.md                    # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/logout` - Logout user (protected)

### Rooms
- `GET /api/rooms` - Get all public rooms (protected)
- `POST /api/rooms` - Create a new room (protected)
- `GET /api/rooms/:roomName` - Get room details (protected)
- `POST /api/rooms/:roomName/join` - Join a room (protected)
- `POST /api/rooms/:roomName/leave` - Leave a room (protected)

### Messages
- `GET /api/messages/room/:roomName` - Get messages for a room (protected)
- `PUT /api/messages/:messageId` - Edit a message (protected)
- `DELETE /api/messages/:messageId` - Delete a message (protected)

## 🔄 Socket Events

### Client → Server
- `join` - Join a chat room
- `send_message` - Send a message to the room
- `typing` - Notify that user is typing
- `stop_typing` - Notify that user stopped typing
- `disconnect` - User disconnects

### Server → Client
- `receive_message` - Receive a new message
- `user_joined` - Notification when user joins
- `user_left` - Notification when user leaves
- `room_users` - Updated list of users in room
- `user_typing` - Someone is typing
- `user_stop_typing` - Someone stopped typing

## 🗄️ Database Schema

### User Model
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  avatar: String,
  status: String (online/offline/away),
  createdAt: Date
}
```

### Message Model
```javascript
{
  room: String (required),
  sender: ObjectId (ref: User),
  senderName: String,
  content: String (required),
  type: String (text/image/file),
  timestamp: Date,
  edited: Boolean,
  editedAt: Date
}
```

### Room Model
```javascript
{
  name: String (required, unique),
  description: String,
  type: String (public/private),
  creator: ObjectId (ref: User),
  members: [ObjectId] (ref: User),
  createdAt: Date,
  lastActivity: Date
}
```

## 🎨 UI Features

- **Modern gradient design** with purple/blue theme
- **Smooth animations** for messages and interactions
- **Responsive layout** adapts to screen size
- **Real-time updates** without page refresh
- **Typing indicators** show user activity
- **Online user list** with avatars
- **Message timestamps** for context
- **System notifications** for user joins/leaves

## 🔒 Security Best Practices

1. **Password Security**
   - Passwords are hashed using bcrypt with salt rounds
   - Never stored in plain text

2. **Authentication**
   - JWT tokens expire after 7 days
   - Tokens stored in localStorage (consider httpOnly cookies for production)
   - Protected routes require valid token

3. **Input Validation**
   - Server-side validation using express-validator
   - Sanitization of user inputs

4. **Environment Variables**
   - Sensitive data stored in .env file
   - .env file excluded from version control

## 🚀 Deployment

### Deploy to Heroku

1. Create a Heroku app:
```bash
heroku create your-app-name
```

2. Set environment variables:
```bash
heroku config:set JWT_SECRET=your_secret_key
heroku config:set MONGODB_URI=your_mongodb_connection_string
```

3. Deploy:
```bash
git push heroku main
```

### Deploy Frontend to Vercel/Netlify

Build the React app and deploy the `client/build` directory.

### Database Hosting

Consider using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for cloud-hosted MongoDB.

## 🧪 Testing

This project includes comprehensive test coverage for both backend and frontend.

### Test Summary
- ✅ **6 tests passing**
- ✅ **Backend:** 4 tests (Authentication API)
- ✅ **Frontend:** 2 tests (Login Component)
- ✅ **Code Coverage:** 51.61% overall, 74% for auth routes

### Run Tests

```bash
# Run backend tests
npm run test:backend

# Run frontend tests
cd client
npm test -- --watchAll=false

# Run all tests
npm run test:all
```

### Test Details
See [TESTING.md](./TESTING.md) for complete test documentation including:
- Detailed test case descriptions
- Expected results and assertions
- Code coverage reports
- Instructions for adding new tests

## 📝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Acknowledgments

- Socket.io for real-time communication
- MongoDB for flexible data storage
- React community for excellent documentation
- All contributors who participate in this project

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Happy Chatting! 💬🚀**
