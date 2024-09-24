import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, children }) => {
  // If logged in, render the children (chat page), else redirect to login
  if (isLoggedIn) {
    return children; // Render children if logged in
  }

  return <Navigate to="/email" />; // Redirect to /login if not logged in
};

export default ProtectedRoute;
