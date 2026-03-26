import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart, FaTrash, FaBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchWishlistBooks();
    }, []);

    const fetchWishlistBooks = async () => {
        try {
            const wishlistRes = await axios.get('/api/wishlist');
            const bookIds = wishlistRes.data.bookIds;

            if (bookIds.length > 0) {
                const bookRequests = bookIds.map(id => axios.get(`/api/books/${id}`));
                const bookResponses = await Promise.all(bookRequests);
                setBooks(bookResponses.map(res => res.data));
            } else {
                setBooks([]);
            }
        } catch (err) {
            setError('Failed to fetch wishlist books');
        }
    };

    const handleRemove = async (bookId) => {
        try {
            await axios.delete(`/api/wishlist/${bookId}`);
            setBooks(books.filter(book => book.bookid !== bookId));
        } catch (err) {
            setError('Failed to remove book from wishlist');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4"><FaHeart /> My Wishlist</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {books.length > 0 ? (
                <div className="row g-4">
                    {books.map((book) => (
                        <div key={book.bookid} className="col-md-12">
                            <div className="card shadow-sm border-0 h-100">
                                <div className="card-body d-flex align-items-center gap-4">
                                    <div className="bg-light p-3 rounded-3 text-primary">
                                        <FaBook size={30} />
                                    </div>
                                    <div className="flex-grow-1">
                                        <h4 className="card-title fw-bold mb-1">
                                            <Link to={`/book/${book.bookid}`} className="text-decoration-none text-dark">
                                                {book.title}
                                            </Link>
                                        </h4>
                                        <p className="text-muted mb-2">by {book.author}</p>
                                    </div>
                                    <div className="text-end">
                                        <h3 className="fw-bold text-success mb-0">₹{book.price}</h3>
                                        <button className="btn btn-sm btn-outline-danger mt-2" onClick={() => handleRemove(book.bookid)}>
                                            <FaTrash className="me-1" /> Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center p-5 border rounded bg-light">
                    <FaHeart size={50} className="text-muted mb-3" />
                    <h4>Your Wishlist is Empty</h4>
                    <p className="text-muted">Explore our collection and add books you love!</p>
                    <Link to="/books" className="btn btn-primary">Browse Books</Link>
                </div>
            )}
        </div>
    );
};

export default Wishlist;