import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ role, children }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Fetch user details from localStorage
  const location = useLocation(); // Get the current location for redirecting after login

  // If no user is authenticated, redirect to the login page
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // If the user's role doesn't match the required role, redirect them to their respective dashboard
  if (user.role !== role) {
    const redirectPath = `/${user.role}/dashboard`;
    return <Navigate to={redirectPath} />;
  }

  // If everything is fine, render the protected component
  return children;
};

export default ProtectedRoute;
