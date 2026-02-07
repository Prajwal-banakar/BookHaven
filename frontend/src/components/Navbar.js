import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBook, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) return null;

  const isActive = (path) => location.pathname === path ? 'active fw-bold' : '';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <FaBook /> Book Inventory
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/')}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/books')}`} to="/books">Books</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/add')}`} to="/add">Add Book</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/search')}`} to="/search">Search</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/delete')}`} to="/delete">Delete</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3 text-white">
            <Link to="/profile" className="text-decoration-none text-white">
              <div className="d-flex align-items-center gap-2 bg-white bg-opacity-10 px-3 py-1 rounded-pill" style={{cursor: 'pointer'}}>
                <FaUserCircle size={20} />
                <span>Welcome, {user.username || 'User'}</span>
              </div>
            </Link>
            <button
              className="btn btn-light btn-sm d-flex align-items-center gap-2 text-primary fw-bold"
              onClick={handleLogout}
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;