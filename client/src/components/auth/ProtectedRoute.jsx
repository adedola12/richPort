// src/components/auth/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // Only allow logged-in admins
  if (!isAuthenticated || user?.userType !== "admin") {
    return (
      <Navigate
        to="/admin-auth" // ✅ this must match your login route
        replace
        state={{ from: location.pathname }} // so we can send them back after login
      />
    );
  }

  return children;
};

export default ProtectedRoute;
