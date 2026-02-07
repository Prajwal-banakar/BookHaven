import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Since the backend expects form data for registration in the controller we wrote earlier
      // Or we can update backend to accept JSON. Let's assume JSON for modern React app.
      // Wait, the AuthController.java uses @ModelAttribute which expects form data.
      // Let's send form data.
      const params = new URLSearchParams();
      params.append('username', formData.username);
      params.append('password', formData.password);

      await axios.post('/register', params);
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Username might be taken.');
    }
  };

  return (
    <div className="col-md-6 offset-md-3 mt-5">
      <div className="card">
        <div className="card-header">
          <h3>Register</h3>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Register</button>
          </form>
          <div className="mt-3 text-center">
            <Link to="/login">Already have an account? Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;