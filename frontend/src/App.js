import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AddBook from './components/AddBook';
import BookList from './components/BookList';
import SearchBook from './components/SearchBook';
import DeleteBook from './components/DeleteBook';
import Profile from './components/Profile';
import UserOrders from './components/UserOrders';
import AdminDashboard from './components/AdminDashboard';
import AdminMessages from './components/AdminMessages';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <div className="container mt-4">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/books" element={<ProtectedRoute><BookList /></ProtectedRoute>} />
              <Route path="/add" element={<ProtectedRoute><AddBook /></ProtectedRoute>} />
              <Route path="/search" element={<ProtectedRoute><SearchBook /></ProtectedRoute>} />
              <Route path="/delete" element={<ProtectedRoute><DeleteBook /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><UserOrders /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
              <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;