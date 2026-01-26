import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import API_BASE_URL from '../../config/api';
import './ChatRoom.css';

const SOCKET_SERVER_URL = process.env.REACT_APP_SOCKET_URL || API_BASE_URL;

function ChatRoom({ user, onLogout }) {
  const { roomName } = useParams();
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [roomUsers, setRoomUsers] = useState([]);
  const [typing, setTyping] = useState('');
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    // Initialize socket connection
    const token = localStorage.getItem('token');
    const newSocket = io(SOCKET_SERVER_URL, {
      auth: { token }
    });

    setSocket(newSocket);

    // Join room
    newSocket.emit('join', {
      userId: user.id,
      username: user.username,
      room: roomName
    });

    // Load previous messages
    loadMessages();

    // Listen for incoming messages
    newSocket.on('receive_message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Listen for user joined
    newSocket.on('user_joined', (data) => {
      setMessages((prev) => [...prev, {
        _id: Date.now(),
        type: 'system',
        content: data.message,
        timestamp: data.timestamp
      }]);
    });

    // Listen for user left
    newSocket.on('user_left', (data) => {
      setMessages((prev) => [...prev, {
        _id: Date.now(),
        type: 'system',
        content: data.message,
        timestamp: data.timestamp
      }]);
    });

    // Listen for room users update
    newSocket.on('room_users', (users) => {
      setRoomUsers(users);
    });

    // Listen for typing indicator
    newSocket.on('user_typing', (data) => {
      setTyping(`${data.username} is typing...`);
    });

    newSocket.on('user_stop_typing', () => {
      setTyping('');
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomName, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/messages/room/${roomName}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data.messages);
    } catch (err) {
      console.error('Error loading messages:', err);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (inputMessage.trim() && socket) {
      socket.emit('send_message', {
        room: roomName,
        message: inputMessage,
        userId: user.id,
        username: user.username
      });
      setInputMessage('');
      socket.emit('stop_typing', { room: roomName, username: user.username });
    }
  };

  const handleTyping = (e) => {
    setInputMessage(e.target.value);

    if (socket) {
      socket.emit('typing', { room: roomName, username: user.username });

      // Clear previous timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Set new timeout
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('stop_typing', { room: roomName, username: user.username });
      }, 1000);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-room-container">
      <div className="chat-header">
        <div className="chat-header-left">
          <button onClick={() => navigate('/rooms')} className="btn-back">
            ← Back
          </button>
          <h2>#{roomName}</h2>
        </div>
        <div className="chat-header-right">
          <span className="online-count">{roomUsers.length} online</span>
          <button onClick={onLogout} className="btn-logout-small">
            Logout
          </button>
        </div>
      </div>

      <div className="chat-layout">
        <div className="chat-main">
          <div className="messages-container">
            {messages.map((msg) => (
              msg.type === 'system' ? (
                <div key={msg._id} className="system-message">
                  {msg.content}
                </div>
              ) : (
                <div
                  key={msg._id}
                  className={`message ${msg.sender === user.id ? 'message-own' : 'message-other'}`}
                >
                  <div className="message-header">
                    <span className="message-sender">{msg.senderName}</span>
                    <span className="message-time">{formatTime(msg.timestamp)}</span>
                  </div>
                  <div className="message-content">{msg.content}</div>
                </div>
              )
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="typing-indicator">
            {typing && <span>{typing}</span>}
          </div>

          <form onSubmit={handleSendMessage} className="message-input-container">
            <input
              type="text"
              value={inputMessage}
              onChange={handleTyping}
              placeholder="Type a message..."
              className="message-input"
            />
            <button type="submit" className="btn-send" disabled={!inputMessage.trim()}>
              Send
            </button>
          </form>
        </div>

        <div className="users-sidebar">
          <h3>Online Users ({roomUsers.length})</h3>
          <div className="users-list">
            {roomUsers.map((roomUser, index) => (
              <div key={index} className="user-item">
                <div className="user-avatar">{roomUser.username[0].toUpperCase()}</div>
                <span className="user-name">{roomUser.username}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
