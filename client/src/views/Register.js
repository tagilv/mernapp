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
    console.log("e.target.value", e.target.value);
    console.log("username input", e.target.value);

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
    console.log("e.target.value", e.target.value);

    setPasswordInput(e.target.value);
    if (e.target.value.length < 6) {
      setIsPasswordError("Password is too short");
      return;
    }
    setIsPasswordError("");
    handleInitialEmtpyFieldsButton();
  };

  // Add this fucntion to check fire when the handlePasswordInputChange() has compelted
  const handleInitialEmtpyFieldsButton = () => {
    if (isEmailError && isPasswordError && isUserNameError === "") {
    }
    setIsFieldsInitialEmtpy("");
  };

  const handleSubmit = async (e) => {
    try {
      // so now the return from this function should be saved in the message
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

                      // value={newUser.userName ? newUser.userName : ""}
                      // onChange={handleChangeHandler}
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
                  // value={newUser.email ? newUser.email : ""}
                  // onChange={handleChangeHandler}
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
                    // value={newUser.password ? newUser.password : ""}
                    // onChange={handleChangeHandler}
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

// PRE

// import { Flex } from "@chakra-ui/react";
// import React, { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext";

// function Register() {
//   const { newUser, setNewUser, signUp } = useContext(AuthContext);

//   const handleChangeHandler = (e) => {
//     console.log(
//       "[e.target.name]: e.target.value",
//       e.target.name,
//       e.target.value
//     );
//     setNewUser({ ...newUser, [e.target.name]: e.target.value });
//   };

//   return (
//     <>
//       {/* Test */}
//       <Flex
//         bg={"yellow"}
//         minH={"100vh"}
//         align={"center"}
//         justify={"center"}
//       ></Flex>
//       <div>
//         <h2>Register Page</h2>
//         <div>
//           <label for="userName">username</label>
//           <input
//             id="username"
//             type="text"
//             name="userName"
//             // The value of my input is what I am going to store in the new user, if there is no new user, leave empty. Otherwise will have an error in the begining when there is no information in my new user.
//             value={newUser.userName ? newUser.userName : ""}
//             onChange={handleChangeHandler}
//           />
//         </div>
//         <div>
//           <label for="email">email</label>
//           <input
//             id="email"
//             type="text"
//             name="email"
//             value={newUser.email ? newUser.email : ""}
//             onChange={handleChangeHandler}
//           />
//         </div>
//         <div>
//           <label for="password">password</label>
//           <input
//             id="password"
//             type="text"
//             name="password"
//             value={newUser.password ? newUser.password : ""}
//             onChange={handleChangeHandler}
//           />
//         </div>
//         <button onClick={signUp}>Sign Up</button>
//       </div>
//     </>
//   );
// }

// export default Register;

// Almost

// import {
//   Box,
//   Button,
//   Flex,
//   FormControl,
//   FormLabel,
//   Heading,
//   HStack,
//   Input,
//   InputGroup,
//   InputRightElement,
//   Stack,
//   Text,
//   useColorModeValue,
// } from "@chakra-ui/react";
// import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// function Register() {
//   const { newUser, setNewUser, signUp } = useContext(AuthContext);

//   const handleChangeHandler = (e) => {
//     console.log(
//       "[e.target.name]: e.target.value",
//       e.target.name,
//       e.target.value
//     );
//     setNewUser({ ...newUser, [e.target.name]: e.target.value });
//   };

//   return (
//     <>
//       {/* Test */}
//       <Flex
//         minH={"100vh"}
//         align={"center"}
//         justify={"center"}
//         bg={useColorModeValue("gray.50", "gray.800")}
//       >
//         <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
//           <Stack align={"center"}>
//             <Heading fontSize={"4xl"} textAlign={"center"}>
//               Sign up
//             </Heading>
//             <Text fontSize={"lg"} color={"gray.600"}>
//               to enjoy all of our cool features ✌️
//             </Text>
//           </Stack>
//           <Box
//             rounded={"lg"}
//             bg={useColorModeValue("white", "gray.700")}
//             boxShadow={"lg"}
//             p={8}
//           >
//             <Stack spacing={4}>
//               <HStack>
//                 <Box>
//                   <FormControl id="username" isRequired>
//                     <FormLabel for="userName">Username</FormLabel>
//                     <Input
//                       type="text"
//                       id="username"
//                       name="userName"
//                       value={newUser.userName ? newUser.userName : ""}
//                       onChange={handleChangeHandler}
//                     />
//                   </FormControl>
//                 </Box>
//               </HStack>
//               <FormControl id="email" isRequired>
//                 <FormLabel for="email">Email</FormLabel>
//                 <Input
//                   type="text"
//                   id="email"
//                   name="email"
//                   value={newUser.email ? newUser.email : ""}
//                   onChange={handleChangeHandler}
//                 />
//               </FormControl>
//               <FormControl id="password" isRequired>
//                 <FormLabel for="password">Password</FormLabel>
//                 <InputGroup>
//                   <Input
//                     id="password"
//                     type="text"
//                     name="password"
//                     value={newUser.password ? newUser.password : ""}
//                     onChange={handleChangeHandler}
//                   />
//                   <InputRightElement h={"full"}>
//                     <Button variant={"ghost"} onClick={signUp}></Button>
//                   </InputRightElement>
//                 </InputGroup>
//               </FormControl>
//               <Stack spacing={"10"} pt={"2"}>
//                 <Button
//                   loadingText="Submitting"
//                   size={"lg"}
//                   bg={"blue.400"}
//                   color={"white"}
//                   _hover={{
//                     bg: "Blue.500",
//                   }}
//                 >
//                   Sign Up
//                 </Button>
//               </Stack>
//               <Stack pt={"6"}>
//                 <Text align={"center"}>
//                   Already an existing user?{" "}
//                   <Link to="/login" color={"blue.400"}>
//                     Login
//                   </Link>
//                 </Text>
//               </Stack>
//             </Stack>
//           </Box>
//         </Stack>
//       </Flex>
//     </>
//   );
// }

// export default Register;

// New Test

// import {
//   Box,
//   Button,
//   Flex,
//   FormControl,
//   FormLabel,
//   Heading,
//   HStack,
//   Input,
//   InputGroup,
//   Stack,
//   Text,
//   useColorModeValue,
// } from "@chakra-ui/react";
// import React, { useContext, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// function Register() {
//   const { newUser, setNewUser, signUp } = useContext(AuthContext);

//   const userName = useRef();
//   const email = useRef();
//   const password = useRef();

//   // const handleChangeHandler = (e) => {
//   //   console.log(
//   //     "[e.target.name]: e.target.value",
//   //     e.target.name,
//   //     e.target.value
//   //   );

//   //   setNewUser({ ...newUser, [e.target.name]: e.target.value });
//   // };

//   const handleSubmit = (e) => {
//     console.log("userName.current.value", userName.current.value);
//     console.log("email.current.value", email.current.value);
//     setNewUser(
//       userName.current.value,
//       email.current.value,
//       password.current.value
//     );
//     signUp(userName.current.value, email.current.value, password.current.value);
//   };

//   return (
//     <>
//       <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"white"}>
//         <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
//           <Stack align={"center"}>
//             <Heading fontSize={"4xl"} textAlign={"center"}>
//               Sign up for an Account
//             </Heading>
//             <Text fontSize={"lg"} color={"gray.600"}></Text>
//           </Stack>
//           <Box
//             rounded={"lg"}
//             bg={useColorModeValue("white", "gray.700")}
//             boxShadow={"lg"}
//             p={8}
//           >
//             <Stack spacing={4}>
//               <HStack>
//                 <Box minW={"100%"}>
//                   <FormControl id="username" isRequired>
//                     <FormLabel for="userName">Username</FormLabel>
//                     <Input
//                       type="text"
//                       id="username"
//                       name="userName"
//                       ref={userName}
//                       // value={newUser.userName ? newUser.userName : ""}
//                       // onChange={handleChangeHandler}
//                     />
//                   </FormControl>
//                 </Box>
//               </HStack>
//               <FormControl id="email" isRequired>
//                 <FormLabel for="email">Email</FormLabel>
//                 <Input
//                   type="text"
//                   id="email"
//                   name="email"
//                   ref={email}
//                   // value={newUser.email ? newUser.email : ""}
//                   // onChange={handleChangeHandler}
//                 />
//               </FormControl>
//               <FormControl id="password" isRequired>
//                 <FormLabel for="password">Password</FormLabel>
//                 <InputGroup>
//                   <Input
//                     id="password"
//                     type="password"
//                     name="password"
//                     ref={password}
//                     // value={newUser.password ? newUser.password : ""}
//                     // onChange={handleChangeHandler}
//                   />
//                 </InputGroup>
//               </FormControl>
//               <Stack spacing={"10"} pt={"2"}>
//                 <Button
//                   onClick={handleSubmit}
//                   size={"lg"}
//                   bg={"blue.400"}
//                   color={"white"}
//                   _hover={{
//                     bg: "Blue.500",
//                   }}
//                 >
//                   <Link to="/login"> Sign Up</Link>
//                 </Button>
//               </Stack>
//               <Stack pt={"6"}>
//                 <Text align={"center"}>
//                   Already an existing user?{" "}
//                   <Link to="/login" color={"blue.400"}>
//                     Login
//                   </Link>
//                 </Text>
//               </Stack>
//             </Stack>
//           </Box>
//         </Stack>
//       </Flex>
//     </>
//   );
// }

// export default Register;

// Working

// import {
//   Box,
//   Button,
//   Flex,
//   FormControl,
//   FormLabel,
//   Heading,
//   HStack,
//   Input,
//   InputGroup,
//   Stack,
//   Text,
//   useColorModeValue,
// } from "@chakra-ui/react";
// import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// function Register() {
//   const { newUser, setNewUser, signUp } = useContext(AuthContext);

//   // const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

//   // const handleChangeHandler = (e) => {
//   //   console.log(
//   //     "[e.target.name]: e.target.value",
//   //     e.target.name,
//   //     e.target.value
//   //   );
//   //   setNewUser({ ...newUser, [e.target.name]: e.target.value });
//   // };

//   const handleChangeHandler = (e) => {
//     console.log(
//       "[e.target.name]: e.target.value",
//       e.target.name,
//       e.target.value
//     );
//     setNewUser({ ...newUser, [e.target.name]: e.target.value });
//   };

//   return (
//     <>
//       <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"white"}>
//         <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
//           <Stack align={"center"}>
//             <Heading fontSize={"4xl"} textAlign={"center"}>
//               Sign up for an Account
//             </Heading>
//             <Text fontSize={"lg"} color={"gray.600"}></Text>
//           </Stack>
//           <Box
//             rounded={"lg"}
//             bg={useColorModeValue("white", "gray.700")}
//             boxShadow={"lg"}
//             p={8}
//           >
//             <Stack spacing={4}>
//               <HStack>
//                 <Box minW={"100%"}>
//                   <FormControl id="username" isRequired>
//                     <FormLabel for="userName">Username</FormLabel>
//                     <Input
//                       type="text"
//                       id="username"
//                       name="userName"
//                       value={newUser.userName ? newUser.userName : ""}
//                       onChange={handleChangeHandler}
//                     />
//                   </FormControl>
//                 </Box>
//               </HStack>
//               <FormControl id="email" isRequired>
//                 <FormLabel for="email">Email</FormLabel>
//                 <Input
//                   type="text"
//                   id="email"
//                   name="email"
//                   value={newUser.email ? newUser.email : ""}
//                   onChange={handleChangeHandler}
//                 />
//               </FormControl>
//               <FormControl id="password" isRequired>
//                 <FormLabel for="password">Password</FormLabel>
//                 <InputGroup>
//                   <Input
//                     id="password"
//                     type="password"
//                     name="password"
//                     value={newUser.password ? newUser.password : ""}
//                     onChange={handleChangeHandler}
//                   />
//                 </InputGroup>
//               </FormControl>
//               <Stack spacing={"10"} pt={"2"}>
//                 <Link to="/login">
//                   <Button
//                     onClick={signUp}
//                     size={"lg"}
//                     bg={"blue.400"}
//                     color={"white"}
//                     _hover={{
//                       bg: "Blue.500",
//                     }}
//                   >
//                     {" "}
//                     Sign Up
//                   </Button>
//                 </Link>
//               </Stack>
//               <Stack pt={"6"}>
//                 <Text align={"center"}>
//                   Already an existing user?{" "}
//                   <Link to="/login" color={"blue.400"}>
//                     Login
//                   </Link>
//                 </Text>
//               </Stack>
//             </Stack>
//           </Box>
//         </Stack>
//       </Flex>
//     </>
//   );
// }

// export default Register;
