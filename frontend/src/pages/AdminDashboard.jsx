import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);

  const token = localStorage.getItem('token');
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchDashboard();
    fetchUsers();
    fetchStores();
  }, []);

  const fetchDashboard = async () => {
    const res = await axios.get('http://localhost:5000/api/admin/dashboard', authHeader);
    setStats(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/api/admin/users', authHeader);
    setUsers(res.data);
  };

  const fetchStores = async () => {
    const res = await axios.get('http://localhost:5000/api/admin/stores', authHeader);
    setStores(res.data);
  };

  return (
    <div className="admin-container">
      <h1 className="title">Admin Dashboard</h1>
      <button onClick={() => {
  localStorage.removeItem('token');
  window.location.href = '/';
}}>
  Logout
</button>


      <div className="stats">
        <div className="stat-card">Users: {stats.totalUsers}</div>
        <div className="stat-card">Stores: {stats.totalStores}</div>
        <div className="stat-card">Ratings: {stats.totalRatings}</div>
      </div>

      <h2 className="section-title">User List</h2>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={i}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.address}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="section-title">Store List</h2>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Avg Rating</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((s, i) => (
            <tr key={i}>
              <td>{s.name}</td>
              <td>{s.address}</td>
              <td>{s.averageRating.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;