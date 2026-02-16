import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaEdit, FaTrash, FaCartPlus, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const isAdmin = user?.role === 'ADMIN';
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleAddToCart = async (bookId) => {
    const success = await addToCart(bookId);
    if (success) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleDelete = async (bookId) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await axios.delete(`/api/books/${bookId}`);
      fetchBooks();
    } catch (error) {
      alert('Failed to delete book');
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="position-relative"
    >
      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 20, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="position-fixed top-0 start-50 bg-success text-white px-4 py-2 rounded-pill shadow-lg d-flex align-items-center gap-2"
            style={{ zIndex: 1050 }}
          >
            <FaCheckCircle /> Added to Cart Successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <h2 className="mb-4 fw-bold" style={{color: '#4e54c8'}}>Book List</h2>
      <div className="row">
        {books.map(book => (
          <motion.div
            className="col-md-4 mb-4"
            key={book.bookid}
            variants={item}
          >
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title fw-bold">{book.title}</h5>
                <h6 className="card-subtitle mb-3 text-muted">{book.author}</h6>
                <div className="card-text">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Publisher:</span>
                    <span className="fw-medium">{book.publisher}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Year:</span>
                    <span className="fw-medium">{book.publicationYear}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Price:</span>
                    <span className="fw-bold text-success">₹{book.price}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Quantity:</span>
                    <span className={`badge ${book.quantity > 0 ? 'bg-success' : 'bg-danger'}`}>
                      {book.quantity > 0 ? book.quantity : 'Out of Stock'}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Language:</span>
                    <span className="badge bg-secondary">{book.language}</span>
                  </div>
                </div>
              </div>
              <div className="card-footer bg-transparent border-top-0">
                {isAdmin ? (
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-primary w-100 btn-sm d-flex align-items-center justify-content-center gap-2"
                      onClick={() => navigate(`/edit/${book.bookid}`)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="btn btn-outline-danger w-100 btn-sm d-flex align-items-center justify-content-center gap-2"
                      onClick={() => handleDelete(book.bookid)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                    onClick={() => handleAddToCart(book.bookid)}
                    disabled={book.quantity <= 0}
                  >
                    <FaCartPlus /> {book.quantity > 0 ? 'Add to Cart' : 'Unavailable'}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {books.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="alert alert-info"
        >
          No books found. Start by adding some!
        </motion.div>
      )}
    </motion.div>
  );
};

export default BookList;