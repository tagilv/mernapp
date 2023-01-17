import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import getToken from "../utils/getToken.js";

function ProtectedRoute({ children }) {
  console.log("protected routes props", children);
  const token = getToken();

  const { user } = useContext(AuthContext);

  const isAuthenticated = token ? (user ? true : false) : false;

  return (
    <>
      {isAuthenticated
        ? children
        : <p>you need to go to login</p> && <Navigate to="/register" />}
    </>
  );
}

export default ProtectedRoute;
