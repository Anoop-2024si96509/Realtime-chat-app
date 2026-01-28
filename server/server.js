const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');
const roomRoutes = require('./routes/rooms');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// REST API Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/rooms', roomRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Real-time Chat API Server' });
});

// Socket.io connection handling
const activeUsers = new Map();

io.on('connection', (socket) => {
  console.log('🔌 New client connected:', socket.id);

  // User joins with authentication
  socket.on('join', ({ userId, username, room }) => {
    socket.join(room);
    activeUsers.set(socket.id, { userId, username, room });
    
    // Notify room that user joined
    socket.to(room).emit('user_joined', {
      username,
      message: `${username} has joined the chat`,
      timestamp: new Date()
    });

    // Send active users in room
    const roomUsers = Array.from(activeUsers.values())
      .filter(user => user.room === room);
    io.to(room).emit('room_users', roomUsers);
  });

  // Handle incoming messages
  socket.on('send_message', async (data) => {
    const { room, message, userId, username } = data;
    const Message = require('./models/Message');
    
    try {
      // Save message to database
      const newMessage = new Message({
        room,
        sender: userId,
        senderName: username,
        content: message,
        timestamp: new Date()
      });
      await newMessage.save();

      // Broadcast message to room
      io.to(room).emit('receive_message', {
        _id: newMessage._id,
        sender: userId,
        senderName: username,
        content: message,
        timestamp: newMessage.timestamp
      });
    } catch (error) {
      console.error('Error saving message:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });

  // Handle typing indicator
  socket.on('typing', ({ room, username }) => {
    socket.to(room).emit('user_typing', { username });
  });

  socket.on('stop_typing', ({ room, username }) => {
    socket.to(room).emit('user_stop_typing', { username });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const user = activeUsers.get(socket.id);
    if (user) {
      socket.to(user.room).emit('user_left', {
        username: user.username,
        message: `${user.username} has left the chat`,
        timestamp: new Date()
      });
      activeUsers.delete(socket.id);

      // Update room users
      const roomUsers = Array.from(activeUsers.values())
        .filter(u => u.room === user.room);
      io.to(user.room).emit('room_users', roomUsers);
    }
    console.log('🔌 Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
