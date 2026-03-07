import React, { useState } from 'react';
import { StompSessionProvider } from 'react-stomp-hooks';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaTimes } from 'react-icons/fa';
import ChatWindow from './ChatWindow';
import { useAuth } from '../context/AuthContext';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  // Widget is only for Users, who always chat with 'admin'
  if (user?.role === 'ADMIN') {
    return null;
  }

  return (
    <>
      <motion.button
        className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          zIndex: 9999,
          boxShadow: '0 4px 15px rgba(79, 70, 229, 0.5)',
          border: '2px solid white',
          padding: 0
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={24} /> : <FaComments size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{
              position: 'fixed',
              bottom: '100px',
              right: '30px',
              width: '370px',
              height: '500px',
              zIndex: 9999
            }}
            className="card shadow-lg border-0 overflow-hidden"
          >
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center p-3">
              <h5 className="mb-0 fw-bold">Chat with Support</h5>
              <button className="btn btn-sm text-white" onClick={() => setIsOpen(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="card-body p-0 h-100">
              <StompSessionProvider url={'http://localhost:8080/ws'}>
                <ChatWindow recipient="admin" />
              </StompSessionProvider>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;