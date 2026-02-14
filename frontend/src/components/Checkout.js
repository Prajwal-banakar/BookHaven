import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { FaCreditCard, FaLock, FaMapMarkerAlt, FaArrowRight, FaCheck } from 'react-icons/fa';

const Checkout = () => {
  const { cart, fetchCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Address, 2: Payment
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: ''
  });
  const [payment, setPayment] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [processing, setProcessing] = useState(false);

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      await axios.post('/api/orders/checkout', {
        paymentMethod: 'Credit Card',
        shippingAddress: `${address.street}, ${address.city}, ${address.state} ${address.zip}`
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
      className="col-md-8 offset-md-2 mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white p-4">
          <h4 className="mb-0 d-flex align-items-center gap-2">
            <FaLock /> Secure Checkout
          </h4>
          <div className="d-flex mt-3 gap-3">
            <div className={`d-flex align-items-center gap-2 ${step >= 1 ? 'text-white' : 'text-white-50'}`}>
              <div className={`rounded-circle bg-white text-primary d-flex align-items-center justify-content-center fw-bold`} style={{width: 24, height: 24}}>1</div>
              <span>Shipping</span>
            </div>
            <div className="text-white-50">-----</div>
            <div className={`d-flex align-items-center gap-2 ${step >= 2 ? 'text-white' : 'text-white-50'}`}>
              <div className={`rounded-circle ${step >= 2 ? 'bg-white text-primary' : 'bg-white-50 text-white'} d-flex align-items-center justify-content-center fw-bold`} style={{width: 24, height: 24}}>2</div>
              <span>Payment</span>
            </div>
          </div>
        </div>

        <div className="card-body p-4">
          <div className="row">
            <div className="col-md-4 order-md-2 mb-4">
              <div className="bg-light p-3 rounded-3">
                <h5 className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-primary">Your Cart</span>
                  <span className="badge bg-primary rounded-pill">{cart.items.length}</span>
                </h5>
                <ul className="list-group mb-3">
                  {cart.items.map(item => (
                    <li className="list-group-item d-flex justify-content-between lh-sm" key={item.bookId}>
                      <div>
                        <h6 className="my-0">{item.title}</h6>
                        <small className="text-muted">Qty: {item.quantity}</small>
                      </div>
                      <span className="text-muted">₹{item.price * item.quantity}</span>
                    </li>
                  ))}
                  <li className="list-group-item d-flex justify-content-between bg-light">
                    <span className="fw-bold">Total (INR)</span>
                    <span className="fw-bold text-success">₹{cart.totalPrice}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-8 order-md-1">
              {step === 1 ? (
                <form onSubmit={handleNextStep}>
                  <h4 className="mb-3">Shipping Address</h4>
                  <div className="mb-3">
                    <label className="form-label">Street Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="street"
                      value={address.street}
                      onChange={handleAddressChange}
                      required
                      placeholder="1234 Main St"
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-5 mb-3">
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={address.city}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">State</label>
                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        value={address.state}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label className="form-label">Zip</label>
                      <input
                        type="text"
                        className="form-control"
                        name="zip"
                        value={address.zip}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                  </div>
                  <button className="btn btn-primary w-100 btn-lg" type="submit">
                    Continue to Payment <FaArrowRight className="ms-2" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h4 className="mb-3">Payment</h4>
                  <div className="mb-3">
                    <label className="form-label">Name on Card</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={payment.name}
                      onChange={handlePaymentChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Card Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cardNumber"
                      value={payment.cardNumber}
                      onChange={handlePaymentChange}
                      required
                      placeholder="0000 0000 0000 0000"
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Expiration</label>
                      <input
                        type="text"
                        className="form-control"
                        name="expiry"
                        value={payment.expiry}
                        onChange={handlePaymentChange}
                        required
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">CVV</label>
                      <input
                        type="password"
                        className="form-control"
                        name="cvv"
                        value={payment.cvv}
                        onChange={handlePaymentChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="d-flex gap-3">
                    <button className="btn btn-outline-secondary w-50" type="button" onClick={() => setStep(1)}>
                      Back
                    </button>
                    <button className="btn btn-success w-50 btn-lg" type="submit" disabled={processing}>
                      {processing ? 'Processing...' : `Pay ₹${cart.totalPrice}`}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;