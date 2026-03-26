import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(i <= rating ? <FaStar key={i} className="text-warning" /> : <FaRegStar key={i} className="text-muted" />);
    }
    return <div className="d-flex gap-1">{stars}</div>;
};

const FeaturedBooks = ({ title, books }) => {
    return (
        <section className="container py-5">
            <h2 className="mb-4 fw-bold">{title}</h2>
            <div className="row flex-nowrap overflow-auto">
                {books.map(book => (
                    <motion.div
                        key={book.bookid}
                        className="col-md-3"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="card h-100">
                            <Link to={`/book/${book.bookid}`} className="text-decoration-none text-dark">
                                <div className="card-body">
                                    <h5 className="card-title">{book.title}</h5>
                                    <p className="card-text text-muted">{book.author}</p>
                                    <StarRating rating={book.averageRating} />
                                </div>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedBooks;