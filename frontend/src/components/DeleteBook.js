import React, { useState } from 'react';
import axios from 'axios';

const DeleteBook = () => {
  const [bookId, setBookId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm('Are you sure you want to delete this book?')) return;

    try {
      await axios.delete(`/api/books/${bookId}`);
      setMessage('Book deleted successfully');
      setError('');
      setBookId('');
    } catch (err) {
      setError('Failed to delete book. Book ID might not exist.');
      setMessage('');
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card">
        <div className="card-header bg-danger text-white">
          <h3>Delete Book</h3>
        </div>
        <div className="card-body">
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleDelete}>
            <div className="mb-3">
              <label className="form-label">Book ID</label>
              <input
                type="text"
                className="form-control"
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
                required
                placeholder="Enter Book ID to delete"
              />
            </div>
            <button type="submit" className="btn btn-danger w-100">Delete Book</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;