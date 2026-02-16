import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`/api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        alert('Failed to fetch book details');
        navigate('/books');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id, navigate]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/books/${book.bookid}`, book);
      alert('Book updated successfully');
      navigate('/books');
    } catch (error) {
      console.error('Error updating book:', error);
      alert('Failed to update book');
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="col-md-8 offset-md-2 mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Edit Book</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Book ID</label>
                <input type="text" className="form-control" name="bookid" value={book.bookid} readOnly disabled />
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
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-success flex-grow-1">Update Book</button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/books')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBook;