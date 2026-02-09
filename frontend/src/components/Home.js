import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBook, FaPlus, FaSearch, FaClipboardList, FaCog, FaUserShield, FaShoppingBag } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <motion.div
      className="container mt-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.div className="text-center mb-5" variants={itemVariants}>
        <h1 className="display-4 fw-bold mb-3">
          Welcome back, <span style={{color: '#4e54c8'}}>{user?.fullName || user?.username}</span>
        </h1>
        <p className="lead text-muted">
          {isAdmin
            ? 'Manage your library inventory and track orders efficiently.'
            : 'Discover your next favorite book and track your orders.'}
        </p>
      </motion.div>

      {/* Dashboard Grid */}
      <motion.div className="row justify-content-center g-4" variants={itemVariants}>

        {/* Common Card: View Books */}
        <div className="col-md-4">
          <Link to="/books" className="text-decoration-none">
            <motion.div
              className="card h-100 border-0 shadow-sm"
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            >
              <div className="card-body p-4 text-center">
                <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                  <FaBook size={32} className="text-primary" />
                </div>
                <h3 className="h4 fw-bold text-dark">Browse Books</h3>
                <p className="text-muted mb-0">
                  {isAdmin ? 'Manage book collection' : 'Explore our catalog'}
                </p>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Admin Specific Cards */}
        {isAdmin && (
          <>
            <div className="col-md-4">
              <Link to="/add" className="text-decoration-none">
                <motion.div
                  className="card h-100 border-0 shadow-sm"
                  whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                >
                  <div className="card-body p-4 text-center">
                    <div className="bg-success bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                      <FaPlus size={32} className="text-success" />
                    </div>
                    <h3 className="h4 fw-bold text-dark">Add New Book</h3>
                    <p className="text-muted mb-0">Expand the inventory</p>
                  </div>
                </motion.div>
              </Link>
            </div>

            <div className="col-md-4">
              <Link to="/admin" className="text-decoration-none">
                <motion.div
                  className="card h-100 border-0 shadow-sm"
                  whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                >
                  <div className="card-body p-4 text-center">
                    <div className="bg-warning bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                      <FaUserShield size={32} className="text-warning" />
                    </div>
                    <h3 className="h4 fw-bold text-dark">Admin Dashboard</h3>
                    <p className="text-muted mb-0">Manage orders & users</p>
                  </div>
                </motion.div>
              </Link>
            </div>
          </>
        )}

        {/* User Specific Cards */}
        {!isAdmin && (
          <>
            <div className="col-md-4">
              <Link to="/orders" className="text-decoration-none">
                <motion.div
                  className="card h-100 border-0 shadow-sm"
                  whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                >
                  <div className="card-body p-4 text-center">
                    <div className="bg-info bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                      <FaShoppingBag size={32} className="text-info" />
                    </div>
                    <h3 className="h4 fw-bold text-dark">My Orders</h3>
                    <p className="text-muted mb-0">Track your purchases</p>
                  </div>
                </motion.div>
              </Link>
            </div>

            <div className="col-md-4">
              <Link to="/profile" className="text-decoration-none">
                <motion.div
                  className="card h-100 border-0 shadow-sm"
                  whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                >
                  <div className="card-body p-4 text-center">
                    <div className="bg-danger bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                      <FaCog size={32} className="text-danger" />
                    </div>
                    <h3 className="h4 fw-bold text-dark">My Profile</h3>
                    <p className="text-muted mb-0">Update your details</p>
                  </div>
                </motion.div>
              </Link>
            </div>
          </>
        )}

        {/* Common Card: Search */}
        <div className="col-md-4">
          <Link to="/search" className="text-decoration-none">
            <motion.div
              className="card h-100 border-0 shadow-sm"
              whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            >
              <div className="card-body p-4 text-center">
                <div className="bg-secondary bg-opacity-10 rounded-circle p-3 d-inline-block mb-3">
                  <FaSearch size={32} className="text-secondary" />
                </div>
                <h3 className="h4 fw-bold text-dark">Search</h3>
                <p className="text-muted mb-0">Find specific books</p>
              </div>
            </motion.div>
          </Link>
        </div>

      </motion.div>
    </motion.div>
  );
};

export default Home;