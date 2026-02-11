import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders/my-orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="col-md-10 offset-md-1"
    >
      <h2 className="mb-4 fw-bold" style={{color: '#4e54c8'}}>My Orders</h2>
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="bg-light">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Items</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Total Price</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td className="p-3"><small className="text-muted">#{order.id.substring(0, 8)}</small></td>
                    <td className="p-3">
                      {order.items && order.items.map((item, index) => (
                        <div key={index} className="mb-1">
                          <span className="fw-medium">{item.title}</span>
                          <span className="text-muted ms-2">x{item.quantity}</span>
                        </div>
                      ))}
                      {!order.items && order.bookTitle && (
                        // Fallback for old single-item orders
                        <div className="fw-medium">{order.bookTitle}</div>
                      )}
                    </td>
                    <td className="p-3">{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td className="p-3 fw-bold text-success">₹{order.totalPrice || order.price}</td>
                    <td className="p-3">
                      <span className={`badge bg-${order.status === 'PENDING' ? 'warning' : order.status === 'APPROVED' ? 'info' : order.status === 'DELIVERED' ? 'success' : 'secondary'}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center p-5 text-muted">
                      No orders found. Go to Books to place an order.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserOrders;