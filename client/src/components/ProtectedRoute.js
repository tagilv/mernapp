import { Box } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import getToken from "../utils/getToken.js";

function ProtectedRoute({ children }) {
  const token = getToken();

  console.log("token", token);

  const { user, isLoading } = useContext(AuthContext);

  console.log("user", user);
  console.log("isLoading", isLoading);

  const isAuthenticated = token ? (user ? true : false) : false;

  console.log("isAuthenticated", isAuthenticated);

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
