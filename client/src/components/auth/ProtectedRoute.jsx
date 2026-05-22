// client/src/components/auth/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children, role = "admin" }) {
  const { initialized, isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!initialized) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
        <p className="text-sm text-neutral-300">
          Loading admin session...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate to="/admin-auth" replace state={{ from: location.pathname }} />
    );
  }

  if (role && user?.userType !== role) {
    return <Navigate to="/admin-auth" replace />;
  }

  return children;
}
