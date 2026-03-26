import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaEdit, FaTrash, FaCartPlus, FaCheckCircle, FaStar, FaRegStar, FaHeart } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(i <= rating ? <FaStar key={i} className="text-warning" /> : <FaRegStar key={i} className="text-muted" />);
  }
  return <div className="d-flex gap-1">{stars}</div>;
};

const BookList = () => {
  const [books, setBooks] = useState([]);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const isAdmin = user?.role === 'ADMIN';
  const [showToast, setShowToast] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
    if (!isAdmin) {
      fetchWishlist();
    }
  }, [isAdmin]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchWishlist = async () => {
    try {
      const response = await axios.get('/api/wishlist');
      setWishlist(response.data.bookIds);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const handleAddToCart = async (bookId) => {
    const success = await addToCart(bookId);
    if (success) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleAddToWishlist = async (bookId) => {
    try {
      if (wishlist.includes(bookId)) {
        await axios.delete(`/api/wishlist/${bookId}`);
        setWishlist(wishlist.filter(id => id !== bookId));
      } else {
        await axios.post(`/api/wishlist/${bookId}`);
        setWishlist([...wishlist, bookId]);
      }
    } catch (error) {
      alert('Failed to update wishlist');
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
              <Link to={`/book/${book.bookid}`} className="text-decoration-none text-dark">
                <div className="card-body">
                  <h5 className="card-title fw-bold">{book.title}</h5>
                  <h6 className="card-subtitle mb-3 text-muted">{book.author}</h6>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <StarRating rating={book.averageRating} />
                    <small className="text-muted">({book.reviewCount || 0})</small>
                  </div>
                  <div className="card-text">
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
                  </div>
                </div>
              </Link>
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
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                      onClick={() => handleAddToCart(book.bookid)}
                      disabled={book.quantity <= 0}
                    >
                      <FaCartPlus /> {book.quantity > 0 ? 'Add to Cart' : 'Unavailable'}
                    </button>
                    <button
                      className={`btn ${wishlist.includes(book.bookid) ? 'btn-danger' : 'btn-outline-danger'}`}
                      onClick={() => handleAddToWishlist(book.bookid)}
                    >
                      <FaHeart />
                    </button>
                  </div>
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