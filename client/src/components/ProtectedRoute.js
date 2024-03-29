import { Box } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import getToken from "../utils/getToken.js";

function ProtectedRoute({ children }) {
  const token = getToken();

  const { user, isLoading } = useContext(AuthContext);

  const isAuthenticated = token ? (user ? true : false) : false;

  return (
    <>
      {isLoading ? (
        <Box minH="100vh"></Box>
      ) : (
        <Box minH="100vh">
          {isAuthenticated
            ? children
            : <p>you need to go to login</p> && <Navigate to="/register" />}
        </Box>
      )}
    </>
  );
}

export default ProtectedRoute;
