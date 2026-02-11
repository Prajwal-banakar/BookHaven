import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaEnvelope, FaUser, FaClock } from 'react-icons/fa';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('/api/contact/all');
      // Sort by newest first
      const sortedMessages = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setMessages(sortedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  return (
    <motion.div
      className="col-md-10 offset-md-1 mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="mb-4 fw-bold" style={{color: '#4e54c8'}}>User Messages</h2>

      {messages.length === 0 ? (
        <div className="alert alert-info text-center">No messages found.</div>
      ) : (
        <div className="row g-4">
          {messages.map(msg => (
            <div className="col-md-6" key={msg.id}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <div className="bg-light p-2 rounded-circle text-primary">
                        <FaUser />
                      </div>
                      <div>
                        <h6 className="mb-0 fw-bold">{msg.name}</h6>
                        <small className="text-muted">{msg.email}</small>
                      </div>
                    </div>
                    <small className="text-muted d-flex align-items-center gap-1">
                      <FaClock size={12} />
                      {new Date(msg.timestamp).toLocaleDateString()}
                    </small>
                  </div>
                  <div className="bg-light p-3 rounded-3">
                    <p className="mb-0 text-dark">{msg.message}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default AdminMessages;