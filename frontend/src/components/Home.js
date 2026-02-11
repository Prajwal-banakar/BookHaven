import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaBook, FaUserFriends, FaClipboardCheck, FaArrowRight, FaLaptop, FaBookReader, FaHistory } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Home = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({ books: 0, users: 0, orders: 0 });

  // Mock fetching stats (In a real app, you'd have an endpoint for this)
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const booksRes = await axios.get('/api/books');
        setStats(prev => ({ ...prev, books: booksRes.data.length }));
        // Users and Orders stats would require admin endpoints
      } catch (e) { console.error(e); }
    };
    fetchStats();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`); // You might need to update SearchBook to read query param
    }
  };

  return (
    <div>
      {/* 1. Professional Hero with Search */}
      <section className="hero-section text-center d-flex flex-column justify-content-center align-items-center">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="display-4 fw-bold mb-3">Central Library Management System</h1>
            <p className="lead mb-5 opacity-90">
              Access thousands of books, journals, and research papers. <br/>
              Manage your reading list and track orders seamlessly.
            </p>

            <form onSubmit={handleSearch} className="d-flex justify-content-center w-100">
              <div className="input-group" style={{ maxWidth: '600px' }}>
                <input
                  type="text"
                  className="form-control form-control-lg rounded-start-pill border-0 px-4"
                  placeholder="Search by title, author, or ISBN..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-primary rounded-end-pill px-4" type="submit">
                  <FaSearch /> Search
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* 2. Quick Stats / Dashboard (If Logged In) */}
      {user && (
        <section className="container mt-n5 position-relative" style={{ zIndex: 10, marginTop: '-50px' }}>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="stat-card d-flex align-items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-circle text-primary bg-opacity-10">
                  <FaBook size={24} />
                </div>
                <div>
                  <h3 className="fw-bold mb-0">{stats.books}</h3>
                  <p className="text-muted mb-0">Total Books</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat-card d-flex align-items-center gap-3" style={{ borderLeftColor: '#16a34a' }}>
                <div className="bg-green-100 p-3 rounded-circle text-success bg-opacity-10">
                  <FaClipboardCheck size={24} />
                </div>
                <div>
                  <h3 className="fw-bold mb-0">Active</h3>
                  <p className="text-muted mb-0">System Status</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat-card d-flex align-items-center gap-3" style={{ borderLeftColor: '#ca8a04' }}>
                <div className="bg-yellow-100 p-3 rounded-circle text-warning bg-opacity-10">
                  <FaUserFriends size={24} />
                </div>
                <div>
                  <h3 className="fw-bold mb-0">Online</h3>
                  <p className="text-muted mb-0">Member Portal</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Services / Features Grid */}
      <section className="container py-5 my-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-dark">Library Services</h2>
          <p className="text-muted">Comprehensive tools for students, faculty, and librarians.</p>
        </div>

        <div className="row g-4">
          {/* Admin Features */}
          {isAdmin && (
            <>
              <div className="col-md-4">
                <Link to="/add" className="text-decoration-none text-dark">
                  <motion.div whileHover={{ y: -5 }} className="feature-card text-center">
                    <div className="mb-3 text-primary"><FaBook size={40} /></div>
                    <h4>Catalog Management</h4>
                    <p className="text-muted small">Add new acquisitions, update metadata, and manage inventory stock.</p>
                  </motion.div>
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="/admin" className="text-decoration-none text-dark">
                  <motion.div whileHover={{ y: -5 }} className="feature-card text-center">
                    <div className="mb-3 text-danger"><FaUserFriends size={40} /></div>
                    <h4>User Administration</h4>
                    <p className="text-muted small">Manage member accounts, roles, and access permissions.</p>
                  </motion.div>
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="/admin" className="text-decoration-none text-dark">
                  <motion.div whileHover={{ y: -5 }} className="feature-card text-center">
                    <div className="mb-3 text-success"><FaClipboardCheck size={40} /></div>
                    <h4>Circulation Desk</h4>
                    <p className="text-muted small">Process book issues, returns, and track overdue items.</p>
                  </motion.div>
                </Link>
              </div>
            </>
          )}

          {/* User Features */}
          {!isAdmin && (
            <>
              <div className="col-md-4">
                <Link to="/books" className="text-decoration-none text-dark">
                  <motion.div whileHover={{ y: -5 }} className="feature-card text-center">
                    <div className="mb-3 text-primary"><FaBookReader size={40} /></div>
                    <h4>Digital Catalog</h4>
                    <p className="text-muted small">Browse our extensive collection of physical and digital resources.</p>
                  </motion.div>
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="/orders" className="text-decoration-none text-dark">
                  <motion.div whileHover={{ y: -5 }} className="feature-card text-center">
                    <div className="mb-3 text-warning"><FaHistory size={40} /></div>
                    <h4>Borrowing History</h4>
                    <p className="text-muted small">View your current loans, past history, and due dates.</p>
                  </motion.div>
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="/profile" className="text-decoration-none text-dark">
                  <motion.div whileHover={{ y: -5 }} className="feature-card text-center">
                    <div className="mb-3 text-info"><FaLaptop size={40} /></div>
                    <h4>My Account</h4>
                    <p className="text-muted small">Update your profile, contact details, and preferences.</p>
                  </motion.div>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* 4. New Arrivals / Featured (Static Mockup for Visuals) */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold">New Arrivals</h3>
            <Link to="/books" className="btn btn-outline-primary btn-sm">View All</Link>
          </div>
          <div className="row">
            {[1, 2, 3, 4].map((item) => (
              <div className="col-md-3 col-6 mb-4" key={item}>
                <div className="bg-white p-3 rounded shadow-sm h-100">
                  <div className="book-cover mb-3">
                    <FaBook size={40} />
                  </div>
                  <h6 className="fw-bold mb-1">Modern Software Engineering</h6>
                  <p className="text-muted small mb-2">David Farley</p>
                  <span className="badge bg-light text-dark border">Tech</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Call to Action */}
      {!user && (
        <section className="py-5 bg-dark text-white text-center">
          <div className="container">
            <h2 className="fw-bold mb-3">Start Your Reading Journey</h2>
            <p className="mb-4 opacity-75">Join thousands of members and access our premium collection today.</p>
            <Link to="/register" className="btn btn-primary btn-lg px-5 rounded-pill">Register Now</Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;