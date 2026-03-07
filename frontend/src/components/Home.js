import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaBook, FaUserFriends, FaClipboardCheck, FaBookReader, FaHistory, FaLaptop, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCommentAlt, FaTimes, FaComments } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Home = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({ books: 0, users: 0, orders: 0 });
  const [showContact, setShowContact] = useState(false);

  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const booksRes = await axios.get('/api/books');
        setStats(prev => ({ ...prev, books: booksRes.data.length }));
      } catch (e) { console.error(e); }
    };
    fetchStats();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus('sending');
    try {
      await axios.post('/api/contact', contactForm);
      setContactStatus('success');
      setContactForm({ name: '', email: '', message: '' });
      setTimeout(() => setContactStatus(''), 3000);
    } catch (error) {
      setContactStatus('error');
    }
  };

  return (
    <div className="pb-5 position-relative" style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section className="hero-section text-center d-flex flex-column justify-content-center align-items-center">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="display-4 fw-bold mb-3" style={{color: '#1e293b'}}>
              Welcome to <span style={{color: '#4f46e5'}}>BookHaven</span>
            </h1>
            <p className="lead mb-5 text-muted">
              Your premier destination for books. Discover, read, and collect your favorites.
            </p>

            <form onSubmit={handleSearch} className="d-flex justify-content-center w-100">
              <div className="input-group shadow-lg rounded-pill overflow-hidden" style={{ maxWidth: '600px' }}>
                <input
                  type="text"
                  className="form-control form-control-lg border-0 px-4"
                  placeholder="Search by title, author, or ISBN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-primary px-4" type="submit">
                  <FaSearch /> Search
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      {user && (
        <section className="container mt-n5 position-relative" style={{ zIndex: 10, marginTop: '-30px' }}>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="stat-card d-flex align-items-center gap-3">
                <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary">
                  <FaBook size={24} />
                </div>
                <div>
                  <h3 className="fw-bold mb-0">{stats.books}</h3>
                  <p className="text-muted mb-0">Books Available</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat-card d-flex align-items-center gap-3">
                <div className="bg-success bg-opacity-10 p-3 rounded-circle text-success">
                  <FaClipboardCheck size={24} />
                </div>
                <div>
                  <h3 className="fw-bold mb-0">Active</h3>
                  <p className="text-muted mb-0">Store Status</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat-card d-flex align-items-center gap-3">
                <div className="bg-warning bg-opacity-10 p-3 rounded-circle text-warning">
                  <FaUserFriends size={24} />
                </div>
                <div>
                  <h3 className="fw-bold mb-0">Online</h3>
                  <p className="text-muted mb-0">Community</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services Grid */}
      <section className="container py-5 my-4">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-dark">Explore BookHaven</h2>
          <p className="text-muted">Everything you need for your reading journey.</p>
        </div>

        <div className="row g-4 justify-content-center">
          {isAdmin ? (
            <>
              <div className="col-md-4">
                <Link to="/add" className="text-decoration-none text-dark">
                  <motion.div whileHover={{ y: -5 }} className="feature-card text-center">
                    <div className="mb-3 text-primary"><FaBook size={40} /></div>
                    <h4>Inventory Management</h4>
                    <p className="text-muted small">Add new titles and manage stock levels.</p>
                  </motion.div>
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="/admin" className="text-decoration-none text-dark">
                  <motion.div whileHover={{ y: -5 }} className="feature-card text-center">
                    <div className="mb-3 text-danger"><FaUserFriends size={40} /></div>
                    <h4>User Management</h4>
                    <p className="text-muted small">Manage customer accounts and roles.</p>
                  </motion.div>
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="/admin" className="text-decoration-none text-dark">
                  <motion.div whileHover={{ y: -5 }} className="feature-card text-center">
                    <div className="mb-3 text-success"><FaClipboardCheck size={40} /></div>
                    <h4>Order Processing</h4>
                    <p className="text-muted small">Review and fulfill customer orders.</p>
                  </motion.div>
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="/admin/chat" className="text-decoration-none text-dark">
                  <motion.div whileHover={{ y: -5 }} className="feature-card text-center">
                    <div className="mb-3 text-info"><FaComments size={40} /></div>
                    <h4>Live Chat</h4>
                    <p className="text-muted small">Respond to customer inquiries in real-time.</p>
                  </motion.div>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="col-md-4">
                <Link to="/books" className="text-decoration-none text-dark">
                  <motion.div whileHover={{ y: -5 }} className="feature-card text-center">
                    <div className="mb-3 text-primary"><FaBookReader size={40} /></div>
                    <h4>Browse Collection</h4>
                    <p className="text-muted small">Explore our extensive catalog of books.</p>
                  </motion.div>
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="/orders" className="text-decoration-none text-dark">
                  <motion.div whileHover={{ y: -5 }} className="feature-card text-center">
                    <div className="mb-3 text-warning"><FaHistory size={40} /></div>
                    <h4>Order History</h4>
                    <p className="text-muted small">Track your purchases and past orders.</p>
                  </motion.div>
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="/profile" className="text-decoration-none text-dark">
                  <motion.div whileHover={{ y: -5 }} className="feature-card text-center">
                    <div className="mb-3 text-info"><FaLaptop size={40} /></div>
                    <h4>My Profile</h4>
                    <p className="text-muted small">Manage your account settings.</p>
                  </motion.div>
                </Link>
              </div>
              <div className="col-md-4">
                <div className="text-decoration-none text-dark" onClick={() => setShowContact(true)} style={{cursor: 'pointer'}}>
                  <motion.div whileHover={{ y: -5 }} className="feature-card text-center">
                    <div className="mb-3 text-success"><FaComments size={40} /></div>
                    <h4>Live Support</h4>
                    <p className="text-muted small">Chat with our support team instantly.</p>
                  </motion.div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Floating Chat Button (replaces old contact button) */}
      {!isAdmin && (
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
          onClick={() => setShowContact(!showContact)}
        >
          {showContact ? (
            <FaTimes size={24} color="white" />
          ) : (
            <FaCommentAlt size={24} color="white" />
          )}
        </motion.button>
      )}

      {/* Chat Modal/Popup */}
      <AnimatePresence>
        {showContact && (
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
              <button className="btn btn-sm text-white" onClick={() => setShowContact(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="card-body p-0 h-100">
              {/* The ChatWindow component is now part of the ChatWidget */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;