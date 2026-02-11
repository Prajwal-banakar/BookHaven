import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

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
                    <td className="p-3">{order.username}</td>
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
    </motion.div>
  );
};

export default AdminDashboard;