import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaBook, FaUserFriends, FaClipboardCheck, FaBookReader, FaHistory, FaLaptop, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCommentAlt, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Home = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({ books: 0, users: 0, orders: 0 });
  const [showContact, setShowContact] = useState(false);

  // Contact Form State
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
      {/* 1. Hero Section */}
      <section className="hero-section text-center d-flex flex-column justify-content-center align-items-center">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="hero-title mb-3">
              Welcome to <span style={{color: '#4f46e5'}}>BookHaven</span>
            </h1>
            <p className="lead mb-5 text-muted fs-4">
              Your premier destination for books. Discover, read, and collect your favorites.
            </p>

            <form onSubmit={handleSearch} className="d-flex justify-content-center w-100">
              <div className="input-group hero-search rounded-pill overflow-hidden" style={{ maxWidth: '650px' }}>
                <input
                  type="text"
                  className="form-control form-control-lg border-0 px-4 bg-transparent"
                  placeholder="Search by title, author, or ISBN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-primary px-5 rounded-end-pill" type="submit">
                  <FaSearch /> Search
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* 2. Quick Stats */}
      {user && (
        <section className="container mt-n5 position-relative" style={{ zIndex: 10, marginTop: '-40px' }}>
          <div className="row g-4">
            <motion.div
              className="col-md-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="stat-card d-flex align-items-center gap-4">
                <div className="bg-primary bg-opacity-10 p-4 rounded-circle text-primary shadow-sm">
                  <FaBook size={28} />
                </div>
                <div>
                  <h3 className="fw-bold mb-0">{stats.books}</h3>
                  <p className="text-muted mb-0 fw-medium">Books Available</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="col-md-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="stat-card d-flex align-items-center gap-4">
                <div className="bg-success bg-opacity-10 p-4 rounded-circle text-success shadow-sm">
                  <FaClipboardCheck size={28} />
                </div>
                <div>
                  <h3 className="fw-bold mb-0">Active</h3>
                  <p className="text-muted mb-0 fw-medium">Store Status</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="col-md-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="stat-card d-flex align-items-center gap-4">
                <div className="bg-warning bg-opacity-10 p-4 rounded-circle text-warning shadow-sm">
                  <FaUserFriends size={28} />
                </div>
                <div>
                  <h3 className="fw-bold mb-0">Online</h3>
                  <p className="text-muted mb-0 fw-medium">Community</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* 3. Services Grid */}
      <section className="container py-5 my-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold display-5 mb-3" style={{color: '#1e293b'}}>Explore BookHaven</h2>
          <p className="text-muted fs-5">Everything you need for your reading journey.</p>
        </div>

        <div className="row g-4">
          {isAdmin ? (
            <>
              <div className="col-md-4">
                <Link to="/add" className="text-decoration-none text-dark">
                  <motion.div whileHover={{ y: -10 }} className="feature-card text-center" style={{borderTopColor: 'var(--primary)'}}>
                    <div className="mb-4 text-primary bg-primary bg-opacity-10 d-inline-block p-3 rounded-circle"><FaBook size={32} /></div>
                    <h4 className="fw-bold mb-3">Inventory Management</h4>
                    <p className="text-muted">Add new titles and manage stock levels efficiently.</p>
                  </motion.div>
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="/admin" className="text-decoration-none text-dark">
                  <motion.div whileHover={{ y: -10 }} className="feature-card text-center" style={{borderTopColor: 'var(--danger)'}}>
                    <div className="mb-4 text-danger bg-danger bg-opacity-10 d-inline-block p-3 rounded-circle"><FaUserFriends size={32} /></div>
                    <h4 className="fw-bold mb-3">User Management</h4>
                    <p className="text-muted">Manage customer accounts and roles securely.</p>
                  </motion.div>
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="/admin" className="text-decoration-none text-dark">
                  <motion.div whileHover={{ y: -10 }} className="feature-card text-center" style={{borderTopColor: 'var(--success)'}}>
                    <div className="mb-4 text-success bg-success bg-opacity-10 d-inline-block p-3 rounded-circle"><FaClipboardCheck size={32} /></div>
                    <h4 className="fw-bold mb-3">Order Processing</h4>
                    <p className="text-muted">Review and fulfill customer orders seamlessly.</p>
                  </motion.div>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="col-md-4">
                <Link to="/books" className="text-decoration-none text-dark">
                  <motion.div whileHover={{ y: -10 }} className="feature-card text-center" style={{borderTopColor: 'var(--primary)'}}>
                    <div className="mb-4 text-primary bg-primary bg-opacity-10 d-inline-block p-3 rounded-circle"><FaBookReader size={32} /></div>
                    <h4 className="fw-bold mb-3">Browse Collection</h4>
                    <p className="text-muted">Explore our extensive catalog of books.</p>
                  </motion.div>
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="/orders" className="text-decoration-none text-dark">
                  <motion.div whileHover={{ y: -10 }} className="feature-card text-center" style={{borderTopColor: 'var(--warning)'}}>
                    <div className="mb-4 text-warning bg-warning bg-opacity-10 d-inline-block p-3 rounded-circle"><FaHistory size={32} /></div>
                    <h4 className="fw-bold mb-3">Order History</h4>
                    <p className="text-muted">Track your purchases and past orders.</p>
                  </motion.div>
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="/profile" className="text-decoration-none text-dark">
                  <motion.div whileHover={{ y: -10 }} className="feature-card text-center" style={{borderTopColor: 'var(--info)'}}>
                    <div className="mb-4 text-info bg-info bg-opacity-10 d-inline-block p-3 rounded-circle"><FaLaptop size={32} /></div>
                    <h4 className="fw-bold mb-3">My Profile</h4>
                    <p className="text-muted">Manage your account settings.</p>
                  </motion.div>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Floating Contact Button */}
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

      {/* Contact Modal/Popup */}
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
              width: '350px',
              zIndex: 9999,
              maxHeight: '80vh',
              overflowY: 'auto'
            }}
            className="card shadow-lg border-0"
          >
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center p-3">
              <h5 className="mb-0 fw-bold">Contact Support</h5>
              <button className="btn btn-sm text-white" onClick={() => setShowContact(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="card-body p-4">
              <div className="mb-4">
                <div className="d-flex align-items-center gap-3 mb-2">
                  <FaMapMarkerAlt className="text-primary" />
                  <small>Bangalore, India</small>
                </div>
                <div className="d-flex align-items-center gap-3 mb-2">
                  <FaEnvelope className="text-primary" />
                  <small>prajwal.banakar18@gmail.com</small>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <FaPhone className="text-primary" />
                  <small>+91 8310484117</small>
                </div>
              </div>

              <hr />

              {contactStatus === 'success' ? (
                <div className="alert alert-success text-center">Message sent successfully!</div>
              ) : (
                <form onSubmit={handleContactSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Name</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Your Name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Email</label>
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      placeholder="Email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Message</label>
                    <textarea
                      className="form-control form-control-sm"
                      rows="3"
                      placeholder="How can we help?"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-100 btn-sm d-flex align-items-center justify-content-center gap-2"
                    disabled={contactStatus === 'sending'}
                  >
                    {contactStatus === 'sending' ? 'Sending...' : <><FaPaperPlane size={12} /> Send</>}
                  </button>
                  {contactStatus === 'error' && <div className="text-danger small mt-2 text-center">Failed to send message.</div>}
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;