import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContexts";

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation(); // Get the current location

  // If authenticated and navigating to login or register, redirect to dashboard
  if (
    isAuthenticated &&
    (location.pathname === "/login" || location.pathname === "/register")
  ) {
    return <Navigate to="/dashboard" />;
  }
  // If authenticated, render the child route component; otherwise, redirect to login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
