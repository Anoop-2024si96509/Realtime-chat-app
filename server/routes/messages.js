const express = require('express');
const Message = require('../models/Message');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get messages for a specific room
router.get('/room/:roomName', authenticateToken, async (req, res) => {
  try {
    const { roomName } = req.params;
    const limit = parseInt(req.query.limit) || 50;
    const skip = parseInt(req.query.skip) || 0;

    const messages = await Message.find({ room: roomName })
      .sort({ timestamp: -1 })
      .limit(limit)
      .skip(skip)
      .populate('sender', 'username avatar');

    res.json({
      messages: messages.reverse(),
      count: messages.length
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

// Delete a message
router.delete('/:messageId', authenticateToken, async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Check if user is the sender
    if (message.sender.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await message.deleteOne();
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ message: 'Error deleting message' });
  }
});

// Edit a message
router.put('/:messageId', authenticateToken, async (req, res) => {
  try {
    const { messageId } = req.params;
    const { content } = req.body;

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Check if user is the sender
    if (message.sender.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    message.content = content;
    message.edited = true;
    message.editedAt = new Date();
    await message.save();

    res.json({ message: 'Message updated successfully', data: message });
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ message: 'Error updating message' });
  }
});

module.exports = router;
