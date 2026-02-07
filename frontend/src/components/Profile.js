import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard } from 'react-icons/fa';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/auth/profile');
      setProfile(response.data);
    } catch (err) {
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;
  if (!profile) return null;

  return (
    <motion.div
      className="col-md-8 offset-md-2 mt-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card shadow-lg border-0 overflow-hidden">
        <div className="card-header border-0 text-white p-4" style={{ background: 'linear-gradient(to right, #4e54c8, #8f94fb)' }}>
          <div className="d-flex align-items-center gap-4">
            <div className="bg-white rounded-circle p-3 text-primary">
              <FaUser size={40} />
            </div>
            <div>
              <h2 className="mb-0 fw-bold">{profile.fullName}</h2>
              <p className="mb-0 opacity-75">@{profile.username}</p>
            </div>
          </div>
        </div>
        <div className="card-body p-5">
          <h4 className="mb-4 text-muted border-bottom pb-2">Personal Information</h4>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="bg-light p-3 rounded-circle text-primary">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <small className="text-muted d-block">Email Address</small>
                  <span className="fw-medium">{profile.email}</span>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="bg-light p-3 rounded-circle text-success">
                  <FaPhone size={20} />
                </div>
                <div>
                  <small className="text-muted d-block">Phone Number</small>
                  <span className="fw-medium">{profile.phoneNumber}</span>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="bg-light p-3 rounded-circle text-danger">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <small className="text-muted d-block">Address</small>
                  <span className="fw-medium">{profile.address}</span>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="bg-light p-3 rounded-circle text-warning">
                  <FaIdCard size={20} />
                </div>
                <div>
                  <small className="text-muted d-block">Role</small>
                  <span className="badge bg-primary px-3 py-2">{profile.role}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;