import React, { useState, useEffect, useRef } from 'react';
import { useStompClient, useSubscription } from 'react-stomp-hooks';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaPaperPlane } from 'react-icons/fa';

const ChatWindow = ({ recipient }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth();
  const stompClient = useStompClient();
  const messagesEndRef = useRef(null);

  // Fetch history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`/api/chat/history/${recipient}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Failed to fetch chat history', error);
      }
    };
    fetchHistory();
  }, [recipient]);

  // Subscribe to incoming messages
  useSubscription(`/user/${user.username}/queue/messages`, (message) => {
    const receivedMessage = JSON.parse(message.body);
    setMessages(prev => [...prev, receivedMessage]);
  });

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() && stompClient) {
      const chatMessage = {
        toUser: recipient,
        content: newMessage,
      };
      stompClient.publish({
        destination: '/app/chat.private',
        body: JSON.stringify(chatMessage),
      });
      setNewMessage('');
    }
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="flex-grow-1 overflow-auto p-3 bg-light">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`d-flex mb-2 ${msg.fromUser === user.username ? 'justify-content-end' : ''}`}
          >
            <div
              className={`p-2 rounded-3 mw-75 ${msg.fromUser === user.username ? 'bg-primary text-white' : 'bg-white shadow-sm'}`}
            >
              <div className="fw-bold small">{msg.fromUser}</div>
              <div>{msg.content}</div>
              <div className="text-end small opacity-75 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-3 bg-white border-top">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button className="btn btn-primary" onClick={sendMessage}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;