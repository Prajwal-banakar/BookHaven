import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaUser, FaPhone, FaMapMarkerAlt, FaTimes, FaTruck } from 'react-icons/fa';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedOrderAddress, setSelectedOrderAddress] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders/all');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/api/orders/${id}/status?status=${status}`);
      fetchOrders();
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const handleUserClick = async (username) => {
    try {
      const response = await axios.get(`/api/users/${username}`);
      setSelectedUser(response.data);
      setShowUserModal(true);
    } catch (error) {
      alert('Failed to fetch user details');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="col-md-12"
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0" style={{color: '#4e54c8'}}>Admin Dashboard</h2>
        <Link to="/admin/messages" className="btn btn-outline-primary d-flex align-items-center gap-2">
          <FaEnvelope /> View Messages
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-white py-3">
          <h5 className="mb-0 fw-bold">Manage Orders</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="bg-light">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">User</th>
                  <th className="p-3">Shipping</th>
                  <th className="p-3">Items</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td className="p-3"><small className="text-muted">#{order.id.substring(0, 8)}</small></td>
                    <td className="p-3">
                      <button
                        className="btn btn-link text-decoration-none p-0 fw-bold"
                        onClick={() => handleUserClick(order.username)}
                      >
                        {order.username}
                      </button>
                    </td>
                    <td className="p-3">
                      {order.shippingAddress ? (
                        <button
                          className="btn btn-sm btn-light text-primary"
                          onClick={() => setSelectedOrderAddress(order.shippingAddress)}
                          title="View Shipping Address"
                        >
                          <FaTruck /> View
                        </button>
                      ) : (
                        <span className="text-muted small">N/A</span>
                      )}
                    </td>
                    <td className="p-3">
                      {order.items && order.items.map((item, index) => (
                        <div key={index} className="small">
                          <span className="fw-medium">{item.title}</span>
                          <span className="text-muted ms-1">({item.quantity})</span>
                        </div>
                      ))}
                      {!order.items && order.bookTitle && (
                        <div className="fw-medium">{order.bookTitle}</div>
                      )}
                    </td>
                    <td className="p-3 fw-bold">₹{order.totalPrice || order.price}</td>
                    <td className="p-3">{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td className="p-3">
                      <span className={`badge bg-${order.status === 'PENDING' ? 'warning' : order.status === 'APPROVED' ? 'info' : order.status === 'DELIVERED' ? 'success' : 'secondary'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-success"
                          onClick={() => updateStatus(order.id, 'APPROVED')}
                          disabled={order.status !== 'PENDING'}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => updateStatus(order.id, 'DELIVERED')}
                          disabled={order.status === 'DELIVERED'}
                        >
                          Deliver
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => updateStatus(order.id, 'CANCELLED')}
                          disabled={order.status === 'CANCELLED' || order.status === 'DELIVERED'}
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* User Details Modal */}
      <AnimatePresence>
        {showUserModal && selectedUser && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="modal-dialog modal-dialog-centered"
            >
              <div className="modal-content border-0 shadow-lg rounded-4">
                <div className="modal-header bg-primary text-white border-0">
                  <h5 className="modal-title fw-bold d-flex align-items-center gap-2">
                    <FaUser /> User Details
                  </h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setShowUserModal(false)}></button>
                </div>
                <div className="modal-body p-4">
                  <div className="text-center mb-4">
                    <div className="bg-light rounded-circle p-3 d-inline-block mb-2 text-primary">
                      <FaUser size={40} />
                    </div>
                    <h4 className="fw-bold mb-0">{selectedUser.fullName}</h4>
                    <p className="text-muted">@{selectedUser.username}</p>
                  </div>

                  <div className="d-flex align-items-center gap-3 mb-3 p-3 bg-light rounded-3">
                    <FaEnvelope className="text-primary" />
                    <div>
                      <small className="text-muted d-block">Email</small>
                      <span className="fw-medium">{selectedUser.email}</span>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3 mb-3 p-3 bg-light rounded-3">
                    <FaPhone className="text-success" />
                    <div>
                      <small className="text-muted d-block">Phone</small>
                      <span className="fw-medium">{selectedUser.phoneNumber}</span>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3">
                    <FaMapMarkerAlt className="text-danger" />
                    <div>
                      <small className="text-muted d-block">Address</small>
                      <span className="fw-medium">{selectedUser.address}</span>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={() => setShowUserModal(false)}>Close</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Shipping Address Modal */}
      <AnimatePresence>
        {selectedOrderAddress && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="modal-dialog modal-dialog-centered modal-sm"
            >
              <div className="modal-content border-0 shadow-lg rounded-4">
                <div className="modal-header bg-info text-white border-0">
                  <h5 className="modal-title fw-bold d-flex align-items-center gap-2">
                    <FaTruck /> Shipping Address
                  </h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setSelectedOrderAddress(null)}></button>
                </div>
                <div className="modal-body p-4 text-center">
                  <p className="lead mb-0">{selectedOrderAddress}</p>
                </div>
                <div className="modal-footer border-0 justify-content-center">
                  <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={() => setSelectedOrderAddress(null)}>Close</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminDashboard;