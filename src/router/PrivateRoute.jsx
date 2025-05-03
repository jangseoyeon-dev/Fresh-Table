import React from "react";
import { Navigate } from "react-router-dom";
import useUserStore from "../stores/useUserStore";

const PrivateRoute = ({ children }) => {
  const { user } = useUserStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
