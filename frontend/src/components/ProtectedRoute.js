import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ role, children }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Fetch user details from localStorage
  const location = useLocation();

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (user.role !== role) {
    // Redirect to the dashboard based on user role
    const redirectPath = `/${user.role}/dashboard`;
    return <Navigate to={redirectPath} />;
  }

  // Render the protected component
  return children;
};

export default ProtectedRoute;
