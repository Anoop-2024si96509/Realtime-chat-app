import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RoomList.css';

function RoomList({ user, onLogout }) {
  const [rooms, setRooms] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRoomData, setNewRoomData] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/rooms', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRooms(response.data.rooms);
      setLoading(false);
    } catch (err) {
      setError('Failed to load rooms');
      setLoading(false);
    }
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/rooms', newRoomData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowCreateModal(false);
      setNewRoomData({ name: '', description: '' });
      fetchRooms();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create room');
    }
  };

  const handleJoinRoom = (roomName) => {
    navigate(`/chat/${roomName}`);
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/auth/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error('Logout error:', err);
    }
    onLogout();
  };

  if (loading) {
    return <div className="loading">Loading rooms...</div>;
  }

  return (
    <div className="room-list-container">
      <div className="room-list-header">
        <h1>Chat Rooms</h1>
        <div className="header-actions">
          <span className="user-info">Welcome, {user.username}!</span>
          <button onClick={() => setShowCreateModal(true)} className="btn-create">
            + Create Room
          </button>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="rooms-grid">
        {rooms.length === 0 ? (
          <div className="no-rooms">
            <p>No rooms available. Create one to get started!</p>
          </div>
        ) : (
          rooms.map((room) => (
            <div key={room._id} className="room-card">
              <h3>{room.name}</h3>
              <p className="room-description">{room.description || 'No description'}</p>
              <div className="room-info">
                <span className="room-type">{room.type}</span>
                <span className="room-members">{room.members.length} members</span>
              </div>
              <button 
                onClick={() => handleJoinRoom(room.name)} 
                className="btn-join"
              >
                Join Room
              </button>
            </div>
          ))
        )}
      </div>

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Room</h2>
            <form onSubmit={handleCreateRoom}>
              <div className="form-group">
                <label>Room Name</label>
                <input
                  type="text"
                  value={newRoomData.name}
                  onChange={(e) => setNewRoomData({ ...newRoomData, name: e.target.value })}
                  required
                  placeholder="Enter room name"
                />
              </div>
              <div className="form-group">
                <label>Description (optional)</label>
                <textarea
                  value={newRoomData.description}
                  onChange={(e) => setNewRoomData({ ...newRoomData, description: e.target.value })}
                  placeholder="Enter room description"
                  rows="3"
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowCreateModal(false)} className="btn-cancel">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoomList;
