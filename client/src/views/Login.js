import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext.js";
import { Link, NavLink } from "react-router-dom";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

function Login() {
  // Hooks needs to be at the top of the component (becasue it needs to be called every time the component is rendered)
  // The hook returns the vaigate function
  const navigate = useNavigate();

  const { login, logout } = useContext(AuthContext);

  const email = useRef();
  const password = useRef();

  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [isEmailError, setIsEmailError] = useState("Email is required");
  const [isPasswordError, setIsPasswordError] = useState(
    "Password is required"
  );

  const [isLoginError, setIsLoginError] = useState("");

  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  // const isPasswordError = passwordInput === "";

  const handleEmailInputChange = (e) => {
    console.log("e.target.value", e.target.value);
    // console.log("email.current.value", email.current.value);
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
    console.log("e.target.value", e.target.value);
    // console.log("email.current.value", email.current.value);
    setPasswordInput(e.target.value);
    if (e.target.value === "") {
      setIsPasswordError("Password is required");
      return;
    }
    setIsPasswordError("");
  };

  // const handlePasswordInputChange = (e) => {
  //   setPasswordInput(e.target.value);
  // };

  const handleSubmit = async (e) => {
    // Cathe the error
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
                >
                  {/* <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link> */}
                </Stack>
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

// console.log("email.current.value", email.current.value);

// const onBlurHandler = (refInput) => {
//   if (email.current?.value === "") {
//     console.log(`${email.current.value} is empty!`);
//   }
// };

// function validateEmail(e) {
//   console.log("email", email);
//   // add validation logic here
//   email(e.target.value);
//   if (regex.test(email) === false) {
//     setEmailError("Please enter valid email");
//   } else {
//     setEmailError("");
//   }
// }

// function validatePassword(e) {
//   // add validation logic here
//   if (password.length > 6) {
//     setPasswordError("Password needs to be at 6 charters long");
//   } else {
//     setPasswordError("");
//   }
// }

// const handleSubmit = (e) => {
//   if (email.current.value === "hi") {
//     console.log("email.current.value", email.current.value);
//   } else {
//     console.log("no");
//   }
//   login(email.current.value, password.current.value);
// };

// function Login() {
//   const { login, logout } = useContext(AuthContext);

//   const email = useRef();
//   const password = useRef();

//   const [emailInput, setEmailInput] = useState("");
//   // const [passwordInput, setPasswordInput] = useState("");

//   const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

//   const isEmailError = emailInput === "";
//   // const isPasswordError = passwordInput === "";

//   const handleEmailInputChange = (e) => {
//     console.log("e.target.value", e.target.value);
//     console.log("email.current.value", email.current.value);
//     setEmailInput(e.target.value);
//   };

//   // const handlePasswordInputChange = (e) => {
//   //   setPasswordInput(e.target.value);
//   // };

//   const handleSubmit = (e) => {
//     if (regex.test(email.current.value) === false) {
//       console.log("email does not pass", email.current.value);
//     } else {
//       console.log("fine");
//     }
//     login(email.current.value, password.current.value);
//   };

//   return (
//     <>
//       <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"white"}>
//         <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
//           <Stack align={"center"}>
//             <Heading fontSize={"4xl"}>Sign in to your account</Heading>
//           </Stack>
//           <Box
//             rounded={"lg"}
//             bg={useColorModeValue("white", "gray.700")}
//             boxShadow={"lg"}
//             p={8}
//           >
//             <Stack spacing={4}>
//               <FormControl id="email" isRequired isInvalid={isEmailError}>
//                 <FormLabel>Email address</FormLabel>
//                 <Input
//                   id="email"
//                   type="text"
//                   name="email"
//                   ref={email}
//                   onChange={handleEmailInputChange}
//                   value={emailInput}
//                 />
//                 {!isEmailError ? (
//                   <FormHelperText>Enter valid email</FormHelperText>
//                 ) : (
//                   <FormErrorMessage>"Email is required."</FormErrorMessage>
//                 )}
//               </FormControl>
//               <FormControl id="password" isRequired>
//                 <FormLabel>Password</FormLabel>
//                 <Input
//                   id="password"
//                   type="password"
//                   name="password"
//                   ref={password}
//                   // onChange={handlePasswordInputChange}
//                 />
//               </FormControl>
//               <Stack spacing={10}>
//                 <Stack
//                   direction={{ base: "column", sm: "row" }}
//                   align={"start"}
//                   justify={"space-between"}
//                 >
//                   {/* <Checkbox>Remember me</Checkbox>
//                   <Link color={"blue.400"}>Forgot password?</Link> */}
//                 </Stack>
//                 <Button
//                   onClick={handleSubmit}
//                   bg={"blue.400"}
//                   color={"white"}
//                   _hover={{
//                     bg: "blue.500",
//                   }}
//                 >
//                   Sign in
//                 </Button>
//               </Stack>
//             </Stack>
//           </Box>
//         </Stack>
//       </Flex>
//     </>
//   );
// }

// export default Login;
