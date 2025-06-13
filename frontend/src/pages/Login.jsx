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
        password,
      });
      const token = res.data.token;
      localStorage.setItem("token", token);
      const { role } = JSON.parse(atob(token.split(".")[1]));
      if (role === "admin") Navigate("/admin");
      else if (role === "user") Navigate("/user");
      else if (role === "store-onwer") Navigate("/owner");
      else Navigate("/");
      alert("Login successful!");
    } catch (err) {
      // setError(err.response?.data?.error || "Login failed");
      setError("Login failed");
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
