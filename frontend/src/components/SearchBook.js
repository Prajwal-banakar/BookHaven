import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaSearch, FaBook } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';

const SearchBook = () => {
  const [searchParams] = useSearchParams();
  const [title, setTitle] = useState(searchParams.get('q') || '');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setTitle(query);
      performSearch(query);
    }
  }, [searchParams]);

  const performSearch = async (searchTitle) => {
    if (!searchTitle.trim()) return;

    try {
      const response = await axios.get(`/api/books/search?title=${searchTitle}`);
      setBooks(response.data);
      setSearched(true);
      setError('');
    } catch (err) {
      setBooks([]);
      setError('Failed to search books');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    performSearch(title);
  };

  return (
    <motion.div
      className="col-md-8 offset-md-2 mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="card mb-4 shadow-sm border-0">
        <div className="card-header bg-white p-4 border-0">
          <h3 className="fw-bold" style={{color: '#4e54c8'}}>Search Book</h3>
          <p className="text-muted">Find books by their title</p>
        </div>
        <div className="card-body p-4 pt-0">
          <form onSubmit={handleSearch} className="d-flex gap-2">
            <div className="input-group input-group-lg">
              <span className="input-group-text bg-light border-end-0">
                <FaSearch className="text-muted" />
              </span>
              <input
                type="text"
                className="form-control bg-light border-start-0"
                placeholder="Enter Book Title (e.g., Harry Potter)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary px-4 fw-bold">Search</button>
            </div>
          </form>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {searched && books.length === 0 && !error && (
        <div className="alert alert-info text-center">No books found matching "{title}"</div>
      )}

      <div className="row g-4">
        {books.map(book => (
          <motion.div
            key={book.bookid}
            className="col-md-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body d-flex align-items-center gap-4">
                <div className="bg-light p-3 rounded-3 text-primary">
                  <FaBook size={30} />
                </div>
                <div className="flex-grow-1">
                  <h4 className="card-title fw-bold mb-1">{book.title}</h4>
                  <p className="text-muted mb-2">by {book.author}</p>
                  <div className="d-flex gap-3 text-sm">
                    <span className="badge bg-light text-dark border">ID: {book.bookid}</span>
                    <span className="badge bg-light text-dark border">{book.publisher}</span>
                    <span className="badge bg-light text-dark border">{book.publicationYear}</span>
                  </div>
                </div>
                <div className="text-end">
                  <h3 className="fw-bold text-success mb-0">₹{book.price}</h3>
                  <small className={`text-${book.quantity > 0 ? 'success' : 'danger'}`}>
                    {book.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                  </small>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SearchBook;