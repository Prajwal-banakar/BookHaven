import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { FaCreditCard, FaLock } from 'react-icons/fa';

const Checkout = () => {
  const { cart, fetchCart } = useCart();
  const navigate = useNavigate();
  const [payment, setPayment] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      await axios.post('/api/orders/checkout', {
        paymentMethod: 'Credit Card',
        // In a real app, we wouldn't send raw card details here, but a token
      });

      await fetchCart(); // Refresh cart (should be empty)
      alert('Order Placed Successfully!');
      navigate('/orders');
    } catch (error) {
      alert('Checkout failed: ' + (error.response?.data || error.message));
    } finally {
      setProcessing(false);
    }
  };

  if (!cart.items || cart.items.length === 0) {
    return <div className="text-center mt-5">Cart is empty</div>;
  }

  return (
    <motion.div
      className="col-md-6 offset-md-3 mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white p-3">
          <h4 className="mb-0 d-flex align-items-center gap-2">
            <FaLock /> Secure Checkout
          </h4>
        </div>
        <div className="card-body p-4">
          <div className="mb-4 border-bottom pb-3">
            <h5>Order Summary</h5>
            <div className="d-flex justify-content-between">
              <span>Total Items:</span>
              <span>{cart.items.length}</span>
            </div>
            <div className="d-flex justify-content-between fw-bold fs-5 mt-2">
              <span>Total Amount:</span>
              <span className="text-success">₹{cart.totalPrice}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <h5 className="mb-3"><FaCreditCard className="me-2" />Payment Details</h5>

            <div className="mb-3">
              <label className="form-label">Cardholder Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={payment.name}
                onChange={handleChange}
                required
                placeholder="Name on card"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Card Number</label>
              <input
                type="text"
                className="form-control"
                name="cardNumber"
                value={payment.cardNumber}
                onChange={handleChange}
                required
                placeholder="0000 0000 0000 0000"
                maxLength="19"
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Expiry Date</label>
                <input
                  type="text"
                  className="form-control"
                  name="expiry"
                  value={payment.expiry}
                  onChange={handleChange}
                  required
                  placeholder="MM/YY"
                  maxLength="5"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">CVV</label>
                <input
                  type="password"
                  className="form-control"
                  name="cvv"
                  value={payment.cvv}
                  onChange={handleChange}
                  required
                  placeholder="123"
                  maxLength="3"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 py-2 fw-bold"
              disabled={processing}
            >
              {processing ? 'Processing Payment...' : `Pay ₹${cart.totalPrice}`}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;