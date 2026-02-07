import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBook, FaPlus, FaSearch } from 'react-icons/fa';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
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
      className="text-center mt-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className="display-4 fw-bold mb-4" variants={itemVariants}>
        Welcome to <span style={{color: '#4e54c8'}}>Book Inventory</span>
      </motion.h1>
      <motion.p className="lead text-muted mb-5" variants={itemVariants}>
        Manage your library efficiently with our modern inventory system.
      </motion.p>

      <motion.div className="row justify-content-center gap-4" variants={itemVariants}>
        <Link to="/books" className="text-decoration-none col-md-3">
          <motion.div
            className="card p-4 h-100"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="card-body">
              <FaBook size={40} className="mb-3 text-primary" />
              <h3>View Books</h3>
              <p className="text-muted">Browse your complete collection</p>
            </div>
          </motion.div>
        </Link>

        <Link to="/add" className="text-decoration-none col-md-3">
          <motion.div
            className="card p-4 h-100"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="card-body">
              <FaPlus size={40} className="mb-3 text-success" />
              <h3>Add Book</h3>
              <p className="text-muted">Expand your library</p>
            </div>
          </motion.div>
        </Link>

        <Link to="/search" className="text-decoration-none col-md-3">
          <motion.div
            className="card p-4 h-100"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="card-body">
              <FaSearch size={40} className="mb-3 text-info" />
              <h3>Search</h3>
              <p className="text-muted">Find books instantly</p>
            </div>
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Home;