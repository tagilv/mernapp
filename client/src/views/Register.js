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
  HStack,
  Input,
  InputGroup,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Register() {
  const { newUser, setNewUser, signUp } = useContext(AuthContext);

  const navigate = useNavigate();

  const userName = useRef("");
  const email = useRef("");
  const password = useRef("");

  const [userNameInput, setUserNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [isUserNameError, setIsUserNameError] = useState("");
  const [isEmailError, setIsEmailError] = useState("");
  const [isPasswordError, setIsPasswordError] = useState("");

  const [isSignUpError, setisSignUpError] = useState("");

  const [isFieldsInitialEmtpy, setIsFieldsInitialEmtpy] =
    useState("InitialEmtpy");

  const handleUserNameInputChange = (e) => {
    setUserNameInput(e.target.value);
    if (e.target.value === "") {
      setIsUserNameError("Username is required");
      return;
    }
    setIsUserNameError("");
  };

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
    if (e.target.value.length < 6) {
      setIsPasswordError("Password is too short");
      return;
    }
    setIsPasswordError("");
    handleInitialEmtpyFieldsButton();
  };

  const handleInitialEmtpyFieldsButton = () => {
    if (isEmailError && isPasswordError && isUserNameError === "") {
    }
    setIsFieldsInitialEmtpy("");
  };

  const handleSubmit = async (e) => {
    try {
      const resultObject = await signUp(
        userName.current.value,
        email.current.value,
        password.current.value
      );
      alert(resultObject.message);
      navigate("/login", { state: { result: resultObject } });
    } catch (error) {
      setisSignUpError(error.message);
    }
  };

  return (
    <>
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"white"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up for an Account
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}></Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box minW={"100%"}>
                  <FormControl
                    id="username"
                    isRequired
                    isInvalid={isUserNameError}
                  >
                    <FormLabel for="userName">Username</FormLabel>
                    <Input
                      minW={"100%"}
                      type="text"
                      id="username"
                      name="userName"
                      ref={userName}
                      onChange={handleUserNameInputChange}
                      value={userNameInput}
                    />
                    {!isUserNameError ? (
                      <FormHelperText></FormHelperText>
                    ) : (
                      <FormErrorMessage>{isUserNameError}</FormErrorMessage>
                    )}
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired isInvalid={isEmailError}>
                <FormLabel for="email">Email</FormLabel>
                <Input
                  type="text"
                  id="email"
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
                <FormLabel for="password">Password</FormLabel>
                <InputGroup flexDirection="column">
                  <Input
                    minW={"100%"}
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
                </InputGroup>
              </FormControl>

              <Stack spacing={"10"} pt={"2"}>
                <Button
                  isDisabled={
                    isEmailError ||
                    isPasswordError ||
                    isUserNameError ||
                    isFieldsInitialEmtpy
                  }
                  onClick={handleSubmit}
                  size={"lg"}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "Blue.500",
                  }}
                >
                  {" "}
                  Sign Up
                </Button>
                {!isSignUpError ? (
                  <p></p>
                ) : (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>{isSignUpError}</AlertTitle>
                  </Alert>
                )}
              </Stack>
              <Stack pt={"6"}>
                <Text align={"center"}>
                  Already an existing user?{" "}
                  <Link to="/login" color={"blue.400"}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}

export default Register;
