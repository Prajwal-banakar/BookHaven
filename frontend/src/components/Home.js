import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaBook, FaStar, FaGlobe, FaLightbulb, FaHeart, FaTimes, FaCommentAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import FeaturedBooks from './FeaturedBooks'; // Import the new component

const Home = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [newArrivals, setNewArrivals] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    fetchFeaturedBooks();
    fetchRecommendedBooks();
  }, []);

  const fetchFeaturedBooks = async () => {
    try {
      // For now, we'll just fetch all books and slice them.
      // In a real app, these would be separate API endpoints.
      const response = await axios.get('/api/books');
      const allBooks = response.data;

      // Sort by publication year for new arrivals (descending)
      const sortedByYear = [...allBooks].sort((a, b) => parseInt(b.publicationYear) - parseInt(a.publicationYear));
      setNewArrivals(sortedByYear.slice(0, 8)); // Get top 8 new arrivals

      // Sort by average rating for top rated (descending)
      const sortedByRating = [...allBooks].sort((a, b) => b.averageRating - a.averageRating);
      setTopRated(sortedByRating.slice(0, 8)); // Get top 8 top rated
    } catch (error) {
      console.error('Error fetching featured books:', error);
    }
  };

  const fetchRecommendedBooks = async () => {
    try {
      const response = await axios.get('/api/recommendations/popular');
      setRecommended(response.data);
    } catch (error) {
      console.error('Error fetching recommended books:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const genres = [
    { name: 'Fiction', icon: <FaBook /> },
    { name: 'Science', icon: <FaLightbulb /> },
    { name: 'Fantasy', icon: <FaStar /> },
    { name: 'History', icon: <FaGlobe /> },
    { name: 'Mystery', icon: <FaSearch /> },
    { name: 'Romance', icon: <FaHeart /> },
  ];

  return (
    <div className="pb-5 position-relative" style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section className="hero-section text-center d-flex flex-column justify-content-center align-items-center py-5">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="display-4 fw-bold mb-3" style={{color: '#1e293b'}}>
              Discover Your Next Great Read at <span style={{color: '#4f46e5'}}>BookHaven</span>
            </h1>
            <p className="lead mb-5 text-muted">
              Explore a vast collection of books, from timeless classics to new releases.
            </p>

            <form onSubmit={handleSearch} className="d-flex justify-content-center w-100">
              <div className="input-group shadow-lg rounded-pill overflow-hidden" style={{ maxWidth: '700px' }}>
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

      {/* Recommended Books Section */}
      <FeaturedBooks title="Recommended for You" books={recommended} />

      {/* New Arrivals Section */}
      <FeaturedBooks title="New Arrivals" books={newArrivals} />

      {/* Top Rated Books Section */}
      <FeaturedBooks title="Top Rated Books" books={topRated} />

      {/* Browse by Genre Section */}
      <section className="container py-5">
        <h2 className="mb-4 fw-bold text-center">Browse by Genre</h2>
        <div className="row g-4 justify-content-center">
          {genres.map((genre, index) => (
            <motion.div
              key={index}
              className="col-6 col-md-4 col-lg-2"
              whileHover={{ scale: 1.05 }}
            >
              <Link to={`/search?genre=${genre.name}`} className="text-decoration-none">
                <div className="card text-center p-3 shadow-sm h-100 d-flex flex-column justify-content-center align-items-center">
                  <div className="mb-3 text-primary" style={{ fontSize: '3rem' }}>{genre.icon}</div>
                  <h5 className="fw-bold text-dark">{genre.name}</h5>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Floating Chat Button (replaces old contact button) */}
      {!isAdmin && (
        <motion.button
          className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center"
          style={{
            position: 'fixed',
            bottom: '30_px',
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