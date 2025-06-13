import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import "./Form.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

 const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password
    });

    const token = res.data.token;
    localStorage.setItem("token", token);

    const { role } = JSON.parse(atob(token.split('.')[1]));

    // Redirect based on role
    if (role === 'admin') window.location.href = '/admin';
    else if (role === 'user') window.location.href = '/user';
    else if (role === 'store-owner') window.location.href = '/owner';
    else window.location.href = '/';
    
  } catch (err) {
    alert("Login failed: " + (err.response?.data?.error || err.message));
  }
};


  return (
    <>
      <div className="outer-container">
        <div className="form-container">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <div className="error">{error}</div>}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}
