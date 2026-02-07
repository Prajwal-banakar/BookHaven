import React, { useState } from 'react';
import axios from 'axios';

const SearchBook = () => {
  const [bookId, setBookId] = useState('');
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/books/${bookId}`);
      setBook(response.data);
      setError('');
    } catch (err) {
      setBook(null);
      setError('Book not found');
    }
  };

  return (
    <div className="col-md-8 offset-md-2">
      <div className="card mb-4">
        <div className="card-header">
          <h3>Search Book</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSearch} className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Book ID"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {book && (
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">{book.title}</h4>
            <div className="row mt-3">
              <div className="col-md-6">
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Publisher:</strong> {book.publisher}</p>
                <p><strong>Year:</strong> {book.publicationYear}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Price:</strong> ${book.price}</p>
                <p><strong>Quantity:</strong> {book.quantity}</p>
                <p><strong>Language:</strong> {book.language}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBook;