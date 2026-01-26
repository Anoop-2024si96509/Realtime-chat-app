const express = require('express');
const Room = require('../models/Room');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all public rooms
router.get('/', authenticateToken, async (req, res) => {
  try {
    const rooms = await Room.find({ type: 'public' })
      .populate('creator', 'username')
      .sort({ lastActivity: -1 });

    res.json({ rooms });
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'Error fetching rooms' });
  }
});

// Create a new room
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, description, type } = req.body;

    // Check if room already exists
    const existingRoom = await Room.findOne({ name });
    if (existingRoom) {
      return res.status(400).json({ message: 'Room already exists' });
    }

    const room = new Room({
      name,
      description,
      type: type || 'public',
      creator: req.user._id,
      members: [req.user._id]
    });

    await room.save();
    await room.populate('creator', 'username');

    res.status(201).json({
      message: 'Room created successfully',
      room
    });
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ message: 'Error creating room' });
  }
});

// Get room details
router.get('/:roomName', authenticateToken, async (req, res) => {
  try {
    const { roomName } = req.params;
    const room = await Room.findOne({ name: roomName })
      .populate('creator', 'username avatar')
      .populate('members', 'username avatar status');

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.json({ room });
  } catch (error) {
    console.error('Error fetching room:', error);
    res.status(500).json({ message: 'Error fetching room' });
  }
});

// Join a room
router.post('/:roomName/join', authenticateToken, async (req, res) => {
  try {
    const { roomName } = req.params;
    const room = await Room.findOne({ name: roomName });

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    if (room.members.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already a member' });
    }

    room.members.push(req.user._id);
    await room.save();

    res.json({ message: 'Joined room successfully' });
  } catch (error) {
    console.error('Error joining room:', error);
    res.status(500).json({ message: 'Error joining room' });
  }
});

// Leave a room
router.post('/:roomName/leave', authenticateToken, async (req, res) => {
  try {
    const { roomName } = req.params;
    const room = await Room.findOne({ name: roomName });

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    room.members = room.members.filter(
      memberId => memberId.toString() !== req.user._id.toString()
    );
    await room.save();

    res.json({ message: 'Left room successfully' });
  } catch (error) {
    console.error('Error leaving room:', error);
    res.status(500).json({ message: 'Error leaving room' });
  }
});

module.exports = router;
