import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ type: '', msg: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', msg: '' });
    try {
      await login(username, password);
      setStatus({ type: 'success', msg: 'Login Successful! Redirecting...' });
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setStatus({ type: 'error', msg: 'Invalid credentials. Please try again.' });
    }
  };

  return (
    <motion.div
      className="col-md-4 offset-md-4 mt-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card shadow-lg border-0">
        <div className="card-header bg-white border-0 text-center pt-4">
          <h3 className="fw-bold" style={{color: '#4e54c8'}}>Welcome Back</h3>
          <p className="text-muted">Login to your account</p>
        </div>
        <div className="card-body p-4">
          {status.msg && (
            <div className={`alert alert-${status.type === 'success' ? 'success' : 'danger'} text-center`} role="alert">
              {status.msg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-medium">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-4">
              <label className="form-label fw-medium">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 py-2 fw-bold"
              disabled={status.type === 'success'}
            >
              {status.type === 'success' ? 'Success!' : 'Login'}
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-muted">
              Don't have an account? <Link to="/register" className="text-decoration-none fw-bold" style={{color: '#4e54c8'}}>Register</Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;