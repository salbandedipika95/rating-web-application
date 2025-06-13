import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = JSON.parse(atob(token?.split('.')[1] || '')).role;

  if (!token) return <Navigate to='/' />;
  if (!allowedRoles.includes(role)) return <Navigate to='/' />;
  

  return <Component />;
};

export default ProtectedRoute;