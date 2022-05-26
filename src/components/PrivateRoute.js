import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;