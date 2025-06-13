import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OwnerDashboard.css';

const OwnerDashboard = () => {
  const [storeData, setStoreData] = useState([]);
  const token = localStorage.getItem('token');
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const res = await axios.get('http://localhost:5000/api/owner/dashboard', authHeader);
    setStoreData(res.data);
  };

  return (
    <div className="owner-container">
      <h1 className="title">Store Owner Dashboard</h1>

      {storeData.map((entry, index) => (
        <div key={index} className="store-block">
          <h2>{entry.store}</h2>
          <p><strong>Average Rating:</strong> {entry.averageRating.toFixed(1)}</p>

          <table className="custom-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {entry.users.map((user, idx) => (
                <tr key={idx}>
                  <td>{user.name}</td>
                  <td>{user.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default OwnerDashboard;