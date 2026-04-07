import React from 'react';
import { FaBook, FaUsers, FaShoppingCart } from 'react-icons/fa';

const AdminStats = ({ stats }) => {
    return (
        <div className="row">
            <div className="col-md-4">
                <div className="card text-center p-3">
                    <div className="card-body">
                        <FaBook size={40} className="text-primary" />
                        <h3 className="card-title mt-3">{stats.totalBooks}</h3>
                        <p className="card-text text-muted">Total Books</p>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card text-center p-3">
                    <div className="card-body">
                        <FaUsers size={40} className="text-success" />
                        <h3 className="card-title mt-3">{stats.totalUsers}</h3>
                        <p className="card-text text-muted">Total Users</p>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card text-center p-3">
                    <div className="card-body">
                        <FaShoppingCart size={40} className="text-danger" />
                        <h3 className="card-title mt-3">{stats.totalOrders}</h3>
                        <p className="card-text text-muted">Total Orders</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminStats;