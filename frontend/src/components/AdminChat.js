import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StompSessionProvider } from 'react-stomp-hooks';
import ChatWindow from './ChatWindow';
import { FaUser } from 'react-icons/fa';

const AdminChat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/chat/users');
        setUsers(response.data);
        if (response.data.length > 0) {
          setSelectedUser(response.data[0]);
        }
      } catch (error) {
        console.error('Failed to fetch chat users', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <StompSessionProvider url={'http://localhost:8080/ws'}>
      <div className="row g-0" style={{ height: 'calc(100vh - 100px)' }}>
        {/* User List Sidebar */}
        <div className="col-md-3 border-end bg-light">
          <div className="p-3 border-bottom fw-bold">Chat Users</div>
          <div className="list-group list-group-flush">
            {users.map(user => (
              <button
                key={user}
                className={`list-group-item list-group-item-action d-flex align-items-center gap-2 ${selectedUser === user ? 'active' : ''}`}
                onClick={() => setSelectedUser(user)}
              >
                <FaUser /> {user}
              </button>
            ))}
            {users.length === 0 && <div className="p-3 text-muted small">No active chats</div>}
          </div>
        </div>

        {/* Chat Window */}
        <div className="col-md-9">
          {selectedUser ? (
            <ChatWindow recipient={selectedUser} key={selectedUser} />
          ) : (
            <div className="d-flex h-100 align-items-center justify-content-center text-muted">
              Select a user to start chatting
            </div>
          )}
        </div>
      </div>
    </StompSessionProvider>
  );
};

export default AdminChat;