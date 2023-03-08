import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext.js";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (location.state !== null) {
      setEmailInput(location.state.result.user.email);
    } else {
      setEmailInput("");
    }
  }, []);

  const { login, logout } = useContext(AuthContext);

  const email = useRef();
  const password = useRef();

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [isEmailError, setIsEmailError] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(
    "Password is required"
  );

  const [isLoginError, setIsLoginError] = useState("");

  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const handleEmailInputChange = (e) => {
    setEmailInput(e.target.value);
    if (regex.test(email.current.value) === false) {
      setIsEmailError("Enter valid email address");
      return;
    }
    if (e.target.value === "") {
      setIsEmailError("Email is required");
      return;
    }
    setIsEmailError("");
  };

  const handlePasswordInputChange = (e) => {
    setPasswordInput(e.target.value);
    if (e.target.value === "") {
      setIsPasswordError("Password is required");
      return;
    }
    setIsPasswordError("");
  };

  const handleSubmit = async (e) => {
    try {
      await login(email.current.value, password.current.value);
      navigate("/weeks");
    } catch (error) {
      setIsLoginError(error.message);
    }
  };

  return (
    <>
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"white"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email" isRequired isInvalid={isEmailError}>
                <FormLabel>Email address</FormLabel>
                <Input
                  id="email"
                  type="text"
                  name="email"
                  ref={email}
                  onChange={handleEmailInputChange}
                  value={emailInput}
                />
                {!isEmailError ? (
                  <FormHelperText></FormHelperText>
                ) : (
                  <FormErrorMessage>{isEmailError}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl id="password" isRequired isInvalid={isPasswordError}>
                <FormLabel>Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  ref={password}
                  onChange={handlePasswordInputChange}
                  value={passwordInput}
                />
                {!isPasswordError ? (
                  <FormHelperText></FormHelperText>
                ) : (
                  <FormErrorMessage>{isPasswordError}</FormErrorMessage>
                )}
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                ></Stack>
                <Button
                  isDisabled={isEmailError || isPasswordError}
                  onClick={handleSubmit}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
                {!isLoginError ? (
                  <p></p>
                ) : (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>{isLoginError}</AlertTitle>
                  </Alert>
                )}
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}

export default Login;
