import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

const WishlistPreview = () => {
    const [wishlistBooks, setWishlistBooks] = useState([]);

    useEffect(() => {
        fetchWishlistPreview();
    }, []);

    const fetchWishlistPreview = async () => {
        try {
            const wishlistRes = await axios.get('/api/wishlist');
            const bookIds = wishlistRes.data.bookIds.slice(0, 5); // Get first 5 book IDs

            if (bookIds.length > 0) {
                const bookRequests = bookIds.map(id => axios.get(`/api/books/${id}`));
                const bookResponses = await Promise.all(bookRequests);
                setWishlistBooks(bookResponses.map(res => res.data));
            }
        } catch (error) {
            console.error('Error fetching wishlist preview:', error);
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h5 className="mb-0">My Wishlist</h5>
            </div>
            <div className="card-body">
                {wishlistBooks.length > 0 ? (
                    <ul className="list-group list-group-flush">
                        {wishlistBooks.map(book => (
                            <li key={book.bookid} className="list-group-item">
                                <Link to={`/book/${book.bookid}`}>{book.title}</Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Your wishlist is empty.</p>
                )}
                <div className="text-center mt-3">
                    <Link to="/wishlist" className="btn btn-primary">
                        <FaHeart className="me-2" /> View Full Wishlist
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default WishlistPreview;