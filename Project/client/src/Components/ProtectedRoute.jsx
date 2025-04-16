import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const role = localStorage.getItem('role');

  if (!role) {
    return <Navigate to="/search-event" replace />;
  }

  if (role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
