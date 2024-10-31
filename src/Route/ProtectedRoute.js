import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../component/layout/Loader/Loader";

const ProtectedRoute = ({isAdmin, children  }) => {
  const { loading, isAuthenticated ,user } = useSelector((state) => state.user); 


  if (loading) {
    return <Loader/>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }
  if (isAdmin === true && user?.role !== "admin" && user?.role !== "subadmin") {
    return <Navigate to="/login" />;
  }


  return children; // Render the protected component if authenticated
};

export default ProtectedRoute;
