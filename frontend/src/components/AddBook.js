import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    bookid: '',
    title: '',
    author: '',
    publisher: '',
    publicationYear: '',
    price: '',
    quantity: '',
    language: ''
  });

  useEffect(() => {
    // Generate random ID
    const randomId = Math.random().toString(36).substring(2, 10).toUpperCase();
    setBook(prev => ({ ...prev, bookid: randomId }));
  }, []);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/books', book);
      navigate('/books');
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book');
    }
  };

  return (
    <div className="col-md-8 offset-md-2">
      <div className="card">
        <div className="card-header">
          <h3>Add New Book</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Book ID</label>
                <input type="text" className="form-control" name="bookid" value={book.bookid} readOnly />
              </div>
              <div className="col-md-6">
                <label className="form-label">Title</label>
                <input type="text" className="form-control" name="title" value={book.title} onChange={handleChange} required />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Author</label>
                <input type="text" className="form-control" name="author" value={book.author} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Publisher</label>
                <input type="text" className="form-control" name="publisher" value={book.publisher} onChange={handleChange} required />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Year</label>
                <input type="number" className="form-control" name="publicationYear" value={book.publicationYear} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Price</label>
                <input type="number" className="form-control" name="price" value={book.price} onChange={handleChange} required />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Quantity</label>
                <input type="number" className="form-control" name="quantity" value={book.quantity} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Language</label>
                <input type="text" className="form-control" name="language" value={book.language} onChange={handleChange} required />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">Add Book</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;