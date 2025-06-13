import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserDashboard.css';

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');
  const token = localStorage.getItem('token');
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchStores();
  }, []);

 const fetchStores = async () => {
  try {
    const res = await axios.get('http://localhost:5000/api/user/stores', authHeader);
    console.log('Fetched stores:', res.data); // ✅ debug log
    setStores(res.data);
  } catch (err) {
    console.error('Failed to fetch stores:', err.response?.data || err.message); // ❌ error log
  }
};


  const handleRate = async (storeId, rating) => {
    await axios.post('http://localhost:5000/api/user/rate', { storeId, rating }, authHeader);
    fetchStores();
  };

  return (
    <div className="user-container">
      <h1 className="title">User Dashboard</h1>

      <input
        className="search-input"
        placeholder="Search by store name or address"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="store-grid">
        {stores.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.address.toLowerCase().includes(search.toLowerCase())).map((store, index) => (
          <div key={index} className="store-card">
            <h3>{store.name}</h3>
            <p><strong>Address:</strong> {store.address}</p>
            <p><strong>Average Rating:</strong> {store.averageRating.toFixed(1)}</p>

            <div className="rating-controls">
              <label htmlFor={`rating-${store.id}`}>Your Rating:</label>
              <select id={`rating-${store.id}`} onChange={(e) => handleRate(store.id, Number(e.target.value))}>
                <option value="">-- Select --</option>
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;