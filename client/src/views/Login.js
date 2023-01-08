import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext.js";
import { Link, NavLink } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { redirect } from "react-router-dom";

function Login() {
  const { login, logout } = useContext(AuthContext);

  const email = useRef();
  const password = useRef();

  const handleSubmit = (e) => {
    login(email.current.value, password.current.value);
  };

  // const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

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
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input id="email" type="text" name="email" ref={email} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  ref={password}
                />
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
                  onClick={handleSubmit}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}

export default Login;

// Pre

// <div className="h-screen container mx-auto px-4 bg-amber-100">
//   <h2>Login Page</h2>
//   <div>
//     <label htmlFor="email">email</label>
//     <input id="email" type="text" name="email" ref={email} />
//   </div>
//   <div>
//     <label htmlFor="password">password</label>
//     <input id="password" type="text" name="password" ref={password} />
//   </div>
//   <NavLink
//     onClick={() => login(email.current.value, password.current.value)}
//     to="/"
//   >
//     login
//   </NavLink>
// </div>;

// function Login() {
//   const { login, logout } = useContext(AuthContext);

//   const email = useRef();
//   const password = useRef();

//   return (
//     <>
//       <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"white"}>
//         <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
//           <Stack align={"center"}>
//             <Heading fontSize={"4xl"}>Sign in to your account</Heading>
//           </Stack>
//           <Box
//             rounded={"lg"}
//             boxShadow={"lg"}
//             p={8}
//           >
//             <Stack spacing={4}>
//               <FormControl id="email" isRequired>
//                 <FormLabel>Email address</FormLabel>
//                 <Input id="email" type="text" name="email" ref={email} />
//               </FormControl>
//               <FormControl id="password" isRequired>
//                 <FormLabel>Password</FormLabel>
//                 <Input
//                   id="password"
//                   type="password"
//                   name="password"
//                   ref={password}
//                 />
//               </FormControl>
//               <Stack spacing={10}>
//                 <Stack
//                   direction={{ base: "column", sm: "row" }}
//                   align={"start"}
//                   justify={"space-between"}
//                 >
//                 </Stack>
//                 <Button
//                   bg={"blue.400"}
//                   color={"white"}
//                   _hover={{
//                     bg: "blue.500",
//                   }}
//                 >
//                   <NavLink
//                     onClick={() =>
//                       login(email.current.value, password.current.value)
//                     }
//                     to="/"
//                   >
//                     Sign in
//                   </NavLink>
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
