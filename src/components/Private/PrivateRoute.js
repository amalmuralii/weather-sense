import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContexts";

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth(); // Get the authentication status

  // If authenticated, render the child route component; otherwise, redirect to login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
