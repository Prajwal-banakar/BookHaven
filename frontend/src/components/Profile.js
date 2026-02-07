import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/auth/profile');
      setProfile(response.data);
      setEditForm(response.data);
    } catch (err) {
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put('/api/auth/profile', editForm);
      setProfile(response.data);
      setIsEditing(false);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;
  if (!profile) return null;

  return (
    <motion.div
      className="col-md-8 offset-md-2 mt-5 mb-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {message && <div className="alert alert-success">{message}</div>}

      <div className="card shadow-lg border-0 overflow-hidden">
        <div className="card-header border-0 text-white p-4" style={{ background: 'linear-gradient(to right, #4e54c8, #8f94fb)' }}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-4">
              <div className="bg-white rounded-circle p-3 text-primary">
                <FaUser size={40} />
              </div>
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    className="form-control"
                    name="fullName"
                    value={editForm.fullName}
                    onChange={handleEditChange}
                  />
                ) : (
                  <h2 className="mb-0 fw-bold">{profile.fullName}</h2>
                )}
                <p className="mb-0 opacity-75">@{profile.username}</p>
              </div>
            </div>
            <div>
              {!isEditing ? (
                <button className="btn btn-light text-primary fw-bold d-flex align-items-center gap-2" onClick={() => setIsEditing(true)}>
                  <FaEdit /> Edit Profile
                </button>
              ) : (
                <div className="d-flex gap-2">
                  <button className="btn btn-success fw-bold d-flex align-items-center gap-2" onClick={handleSave}>
                    <FaSave /> Save
                  </button>
                  <button className="btn btn-danger fw-bold d-flex align-items-center gap-2" onClick={handleCancel}>
                    <FaTimes /> Cancel
                  </button>
                </div>
              )}
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
                <div className="w-100">
                  <small className="text-muted d-block">Email Address</small>
                  {isEditing ? (
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={editForm.email}
                      onChange={handleEditChange}
                    />
                  ) : (
                    <span className="fw-medium">{profile.email}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="bg-light p-3 rounded-circle text-success">
                  <FaPhone size={20} />
                </div>
                <div className="w-100">
                  <small className="text-muted d-block">Phone Number</small>
                  {isEditing ? (
                    <input
                      type="tel"
                      className="form-control"
                      name="phoneNumber"
                      value={editForm.phoneNumber}
                      onChange={handleEditChange}
                    />
                  ) : (
                    <span className="fw-medium">{profile.phoneNumber}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="bg-light p-3 rounded-circle text-danger">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div className="w-100">
                  <small className="text-muted d-block">Address</small>
                  {isEditing ? (
                    <textarea
                      className="form-control"
                      name="address"
                      value={editForm.address}
                      onChange={handleEditChange}
                      rows="2"
                    />
                  ) : (
                    <span className="fw-medium">{profile.address}</span>
                  )}
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