import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaUser, FaTruck } from 'react-icons/fa';
import AdminStats from './AdminStats';
import AdminBookManagement from './AdminBookManagement';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ totalBooks: 0, totalUsers: 0, totalOrders: 0 });

  useEffect(() => {
    fetchOrders();
    fetchStats();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders/all');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const [booksRes, usersRes, ordersRes] = await Promise.all([
        axios.get('/api/books'),
        axios.get('/api/users'), // Assuming you have a /api/users endpoint
        axios.get('/api/orders/all')
      ]);
      setStats({
        totalBooks: booksRes.data.length,
        totalUsers: usersRes.data.length,
        totalOrders: ordersRes.data.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/api/orders/${id}/status`, { status });
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

      <AdminStats stats={stats} />

      <div className="card shadow-sm mt-4">
        <div className="card-header bg-white py-3">
          <h5 className="mb-0 fw-bold">Recent Orders</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="bg-light">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">User</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map(order => ( // Show only the 5 most recent orders
                  <tr key={order.id}>
                    <td className="p-3"><small className="text-muted">#{order.id.substring(0, 8)}</small></td>
                    <td className="p-3">{order.username}</td>
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

      <AdminBookManagement />

    </motion.div>
  );
};

export default AdminDashboard;