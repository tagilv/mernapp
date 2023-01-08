import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Register() {
  const { newUser, setNewUser, signUp } = useContext(AuthContext);

  // const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  // const handleChangeHandler = (e) => {
  //   console.log(
  //     "[e.target.name]: e.target.value",
  //     e.target.name,
  //     e.target.value
  //   );
  //   setNewUser({ ...newUser, [e.target.name]: e.target.value });
  // };

  // Pre
  const handleChangeHandler = (e) => {
    console.log(
      "[e.target.name]: e.target.value",
      e.target.name,
      e.target.value
    );
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"white"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
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
                <Box>
                  <FormControl id="username" isRequired>
                    <FormLabel for="userName">Username</FormLabel>
                    <Input
                      type="text"
                      id="username"
                      name="userName"
                      value={newUser.userName ? newUser.userName : ""}
                      onChange={handleChangeHandler}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel for="email">Email</FormLabel>
                <Input
                  type="text"
                  id="email"
                  name="email"
                  value={newUser.email ? newUser.email : ""}
                  onChange={handleChangeHandler}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel for="password">Password</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    type="text"
                    name="password"
                    value={newUser.password ? newUser.password : ""}
                    onChange={handleChangeHandler}
                  />
                </InputGroup>
              </FormControl>
              <Stack spacing={"10"} pt={"2"}>
                <Button
                  onClick={signUp}
                  size={"lg"}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "Blue.500",
                  }}
                >
                  <Link to="/login"> Sign Up</Link>
                </Button>
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
