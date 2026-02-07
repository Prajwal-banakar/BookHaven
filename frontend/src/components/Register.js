import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    address: ''
  });
  const [status, setStatus] = useState({ type: '', msg: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', msg: '' });

    try {
      const params = new URLSearchParams();
      params.append('username', formData.username);
      params.append('password', formData.password);
      params.append('fullName', formData.fullName);
      params.append('email', formData.email);
      params.append('phoneNumber', formData.phoneNumber);
      params.append('address', formData.address);

      await axios.post('/register', params);
      setStatus({ type: 'success', msg: 'Registration Successful! Redirecting to login...' });

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setStatus({ type: 'error', msg: 'Registration failed. Username might be taken.' });
    }
  };

  return (
    <motion.div
      className="col-md-6 offset-md-3 mt-5 mb-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card shadow-lg border-0">
        <div className="card-header bg-white border-0 text-center pt-4">
          <h3 className="fw-bold" style={{color: '#4e54c8'}}>Create Account</h3>
          <p className="text-muted">Join our community</p>
        </div>
        <div className="card-body p-4">
          {status.msg && (
            <div className={`alert alert-${status.type === 'success' ? 'success' : 'danger'} text-center`} role="alert">
              {status.msg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="Choose a username"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Choose a password"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-medium">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-medium">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-medium">Address</label>
              <textarea
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Enter your address"
                rows="3"
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 py-2 fw-bold"
              disabled={status.type === 'success'}
            >
              {status.type === 'success' ? 'Account Created!' : 'Register'}
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-muted">
              Already have an account? <Link to="/login" className="text-decoration-none fw-bold" style={{color: '#4e54c8'}}>Login</Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;