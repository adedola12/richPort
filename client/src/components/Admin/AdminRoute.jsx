import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminRoute = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || user?.userType !== "admin") {
    return (
      <Navigate
        to="/admin/auth"
        replace
        state={{ from: location.pathname || "/admin" }}
      />
    );
  }

  return <Outlet />;
};

export default AdminRoute;
