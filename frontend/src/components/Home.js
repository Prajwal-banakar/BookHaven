import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center mt-5">
      <h1>Welcome to Book Inventory System</h1>
      <p className="lead">Manage your books efficiently and easily.</p>
      <div className="mt-4">
        <Link to="/books" className="btn btn-primary btn-lg mx-2">View Books</Link>
        <Link to="/add" className="btn btn-success btn-lg mx-2">Add New Book</Link>
      </div>
    </div>
  );
};

export default Home;