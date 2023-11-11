import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";

const ProtectedRoute = ({ children }) => {
  // Get the isLoggedIn value from the auth context
  const { isLoggedIn } = useAuth();

  // If the user is not logged in, redirect to the login page
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // If the user is logged in, render the children
  return children;
};

export default ProtectedRoute;
