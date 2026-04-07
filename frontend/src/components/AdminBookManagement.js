import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminBookManagement = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 10;

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

    const handleDelete = async (bookId) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await axios.delete(`/api/books/${bookId}`);
                fetchBooks();
            } catch (error) {
                alert('Failed to delete book');
            }
        }
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="card shadow-sm mt-4">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">Inventory Management</h5>
                <input
                    type="text"
                    className="form-control w-25"
                    placeholder="Search books..."
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-hover mb-0 align-middle">
                        <thead className="bg-light">
                            <tr>
                                <th className="p-3">Title</th>
                                <th className="p-3">Author</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Quantity</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentBooks.map(book => (
                                <tr key={book.bookid}>
                                    <td className="p-3">{book.title}</td>
                                    <td className="p-3">{book.author}</td>
                                    <td className="p-3">₹{book.price}</td>
                                    <td className="p-3">{book.quantity}</td>
                                    <td className="p-3">
                                        <Link to={`/edit/${book.bookid}`} className="btn btn-sm btn-outline-primary me-2">
                                            <FaEdit />
                                        </Link>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => handleDelete(book.bookid)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="card-footer bg-white d-flex justify-content-center">
                <nav>
                    <ul className="pagination mb-0">
                        {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }, (_, i) => (
                            <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                <button onClick={() => paginate(i + 1)} className="page-link">
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default AdminBookManagement;