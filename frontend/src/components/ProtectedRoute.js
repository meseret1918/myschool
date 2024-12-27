import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ role, component: Component }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Get user from localStorage
  const location = useLocation(); // Get current location

  if (!user || user.role !== role) {
    // Redirect to login page with the current location as the `from` parameter
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Component />;
};

export default ProtectedRoute;
