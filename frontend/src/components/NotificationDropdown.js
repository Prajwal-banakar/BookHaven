import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaBell, FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      const [notifsRes, countRes] = await Promise.all([
        axios.get('/api/notifications'),
        axios.get('/api/notifications/unread-count')
      ]);
      setNotifications(notifsRes.data);
      setUnreadCount(countRes.data);
    } catch (error) {
      console.error('Error fetching notifications');
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await axios.put(`/api/notifications/${id}/read`);
      fetchNotifications();
    } catch (error) {
      console.error('Error marking as read');
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await axios.put('/api/notifications/read-all');
      fetchNotifications();
    } catch (error) {
      console.error('Error marking all read');
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'SUCCESS': return <FaCheckCircle className="text-success" />;
      case 'WARNING': return <FaExclamationCircle className="text-warning" />;
      default: return <FaInfoCircle className="text-primary" />;
    }
  };

  return (
    <div className="position-relative" ref={dropdownRef}>
      <button
        className="btn btn-link text-white position-relative p-0 me-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBell size={20} />
        {unreadCount > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.6rem'}}>
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="position-absolute end-0 mt-2 bg-white rounded-3 shadow-lg overflow-hidden"
            style={{ width: '320px', zIndex: 1050, right: '-50px' }}
          >
            <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light">
              <h6 className="mb-0 fw-bold text-dark">Notifications</h6>
              {unreadCount > 0 && (
                <button className="btn btn-sm btn-link text-decoration-none p-0" onClick={handleMarkAllRead}>
                  Mark all read
                </button>
              )}
            </div>

            <div className="overflow-auto" style={{ maxHeight: '300px' }}>
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted small">No notifications</div>
              ) : (
                notifications.map(notif => (
                  <div
                    key={notif.id}
                    className={`p-3 border-bottom ${notif.read ? 'bg-white' : 'bg-blue-50'}`}
                    style={{ backgroundColor: notif.read ? 'white' : '#f0f9ff', cursor: 'pointer' }}
                    onClick={() => handleMarkAsRead(notif.id)}
                  >
                    <div className="d-flex gap-3">
                      <div className="mt-1">{getIcon(notif.type)}</div>
                      <div>
                        <p className="mb-1 small text-dark">{notif.message}</p>
                        <small className="text-muted" style={{fontSize: '0.7rem'}}>
                          {new Date(notif.timestamp).toLocaleString()}
                        </small>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDropdown;