import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaRegStar, FaUserCircle, FaCartPlus, FaBook, FaHeart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(i <= rating ? <FaStar key={i} className="text-warning" /> : <FaRegStar key={i} className="text-muted" />);
  }
  return <div className="d-flex gap-1">{stars}</div>;
};

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [inWishlist, setInWishlist] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchBookAndReviews();
    checkWishlist();
  }, [id]);

  const fetchBookAndReviews = async () => {
    try {
      const [bookRes, reviewsRes] = await Promise.all([
        axios.get(`/api/books/${id}`),
        axios.get(`/api/reviews/${id}`)
      ]);
      setBook(bookRes.data);
      setReviews(reviewsRes.data);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  const checkWishlist = async () => {
    try {
      const response = await axios.get('/api/wishlist');
      if (response.data && response.data.bookIds.includes(id)) {
        setInWishlist(true);
      }
    } catch (error) {
      console.error('Failed to check wishlist', error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (newReview.rating === 0) {
      alert('Please select a star rating.');
      return;
    }
    try {
      await axios.post('/api/reviews', { ...newReview, bookId: id });
      setNewReview({ rating: 0, comment: '' });
      fetchBookAndReviews(); // Refresh data
    } catch (error) {
      alert('Failed to submit review.');
    }
  };

  const handleWishlistClick = async () => {
    try {
      if (inWishlist) {
        await axios.delete(`/api/wishlist/${id}`);
      } else {
        await axios.post(`/api/wishlist/${id}`);
      }
      setInWishlist(!inWishlist);
    } catch (error) {
      alert('Failed to update wishlist.');
    }
  };

  if (!book) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <div className="book-cover p-5 text-center shadow-sm">
            <FaBook size={100} />
          </div>
        </div>
        <div className="col-md-8">
          <h1 className="fw-bold display-5">{book.title}</h1>
          <h4 className="text-muted mb-3">{book.author}</h4>
          <div className="d-flex align-items-center gap-2 mb-3">
            <StarRating rating={book.averageRating} />
            <span className="text-muted">({book.reviewCount} reviews)</span>
          </div>
          <p className="fs-4 fw-bold text-success">₹{book.price}</p>
          <p><strong>Publisher:</strong> {book.publisher}</p>
          <p><strong>Year:</strong> {book.publicationYear}</p>
          <p><strong>Language:</strong> {book.language}</p>
          <div className="d-flex gap-2">
            <button
              className="btn btn-primary btn-lg d-flex align-items-center gap-2"
              onClick={() => addToCart(book.bookid)}
              disabled={book.quantity <= 0}
            >
              <FaCartPlus /> {book.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button
              className={`btn btn-lg ${inWishlist ? 'btn-danger' : 'btn-outline-danger'}`}
              onClick={handleWishlistClick}
            >
              <FaHeart />
            </button>
          </div>
        </div>
      </div>

      <hr className="my-5" />

      {/* Reviews Section */}
      <div className="row">
        <div className="col-md-7">
          <h3 className="mb-4">Customer Reviews</h3>
          {reviews.length > 0 ? (
            reviews.map(review => (
              <div key={review.id} className="card mb-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <FaUserCircle size={24} className="text-muted" />
                      <h6 className="mb-0">{review.username}</h6>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="mt-3 mb-1">{review.comment}</p>
                  <small className="text-muted">{new Date(review.timestamp).toLocaleDateString()}</small>
                </div>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to review!</p>
          )}
        </div>
        <div className="col-md-5">
          <div className="card bg-light border-0">
            <div className="card-body">
              <h4 className="mb-3">Write a Review</h4>
              <form onSubmit={handleReviewSubmit}>
                <div className="mb-3">
                  <label className="form-label">Your Rating</label>
                  <div>
                    {[1, 2, 3, 4, 5].map(star => (
                      <span
                        key={star}
                        onClick={() => setNewReview({...newReview, rating: star})}
                        style={{cursor: 'pointer', fontSize: '1.5rem'}}
                        className={star <= newReview.rating ? 'text-warning' : 'text-muted'}
                      >
                        {star <= newReview.rating ? <FaStar /> : <FaRegStar />}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Your Comment</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit Review</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;