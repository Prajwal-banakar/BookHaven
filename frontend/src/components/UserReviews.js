import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(i <= rating ? <FaStar key={i} className="text-warning" /> : <FaRegStar key={i} className="text-muted" />);
    }
    return <div className="d-flex gap-1">{stars}</div>;
};

const UserReviews = ({ username }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (username) {
            fetchUserReviews();
        }
    }, [username]);

    const fetchUserReviews = async () => {
        try {
            const response = await axios.get(`/api/reviews/user/${username}`);
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching user reviews:', error);
        }
    };

    if (reviews.length === 0) {
        return <p>You haven't written any reviews yet.</p>;
    }

    return (
        <div>
            {reviews.map(review => (
                <div key={review.id} className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">
                            <Link to={`/book/${review.bookId}`}>{review.bookTitle || 'Book'}</Link>
                        </h5>
                        <StarRating rating={review.rating} />
                        <p className="card-text mt-2">{review.comment}</p>
                        <small className="text-muted">{new Date(review.timestamp).toLocaleDateString()}</small>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserReviews;