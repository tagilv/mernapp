import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  console.log("protected routes props", children);

  const { user } = useContext(AuthContext);

  const isAuthenticated = user ? true : false;

  return (
    <>
      {isAuthenticated
        ? children
        : <p>you need to go to login</p> && <Navigate to="/register" />}
    </>
  );
}

export default ProtectedRoute;
