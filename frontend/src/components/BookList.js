import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);

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

  return (
    <div>
      <h2 className="mb-4">Book List</h2>
      <div className="row">
        {books.map(book => (
          <div className="col-md-4 mb-4" key={book.bookid}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
                <p className="card-text">
                  <strong>Publisher:</strong> {book.publisher}<br/>
                  <strong>Year:</strong> {book.publicationYear}<br/>
                  <strong>Price:</strong> ${book.price}<br/>
                  <strong>Language:</strong> {book.language}
                </p>
              </div>
              <div className="card-footer bg-transparent">
                <small className="text-muted">ID: {book.bookid}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
      {books.length === 0 && <div className="alert alert-info">No books found.</div>}
    </div>
  );
};

export default BookList;