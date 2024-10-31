import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../component/layout/Loader/Loader";
import { useAlert } from "react-alert";

const ProtectedRouteadmin = ({ isAdmin, children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const alert = useAlert();

  if (loading) {
    return <Loader />;
  }
  
  if (!isAuthenticated) {
    alert.error(`Not Access This Resource login first`);
    return  <Navigate to="/login" />;
 
  }


  if (isAdmin === false && (user?.role === "admin" || user?.role === "subadmin")) {
    alert.error(`Not Access This Resource Because You Are ${user?.role}`);
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRouteadmin;