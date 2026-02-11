import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { FaTrash, FaArrowRight } from 'react-icons/fa';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="text-center mt-5">
        <h3>Your cart is empty</h3>
        <Link to="/books" className="btn btn-primary mt-3">Browse Books</Link>
      </div>
    );
  }

  return (
    <motion.div
      className="col-md-8 offset-md-2 mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="mb-4 fw-bold" style={{color: '#4e54c8'}}>Shopping Cart</h2>
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="bg-light">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map(item => (
                  <tr key={item.bookId}>
                    <td className="p-3">
                      <h6 className="mb-0">{item.title}</h6>
                      <small className="text-muted">{item.author}</small>
                    </td>
                    <td className="p-3">₹{item.price}</td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3 fw-bold">₹{item.price * item.quantity}</td>
                    <td className="p-3">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeFromCart(item.bookId)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-light">
                <tr>
                  <td colSpan="3" className="text-end p-3 fw-bold">Total:</td>
                  <td colSpan="2" className="p-3 fw-bold fs-5 text-success">₹{cart.totalPrice}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className="card-footer bg-white p-3 d-flex justify-content-between">
          <button className="btn btn-outline-secondary" onClick={clearCart}>Clear Cart</button>
          <button className="btn btn-primary d-flex align-items-center gap-2" onClick={() => navigate('/checkout')}>
            Proceed to Checkout <FaArrowRight />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;