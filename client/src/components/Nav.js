import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Link,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaBars } from "react-icons/fa";
import { useLocation } from "react-router-dom";

function Navigation() {
  const { user } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);

  let location = useLocation();
  console.log("location", location.pathname);

  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg="#6B46C1"
        // colorScheme="purple"
        color="white"
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderColor="gray.200"
        align="center"
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily="heading"
            color="gray.800"
          >
            <NavLink to="/">Logo</NavLink>
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={10}
        >
          {/* TEST */}
          {user ? (
            <>
              <Button
                as="a"
                fontSize="sm"
                fontWeight={800}
                variant="link"
                href="#"
                color="white"
              >
                <NavLink to="/profile">Profile</NavLink>
              </Button>

              <Button
                display={{ base: "none", md: "inline-flex" }}
                fontSize="sm"
                fontWeight={600}
                color="white"
                bg="yellow.400"
                href="#"
                _hover={{
                  bg: "yellow.200",
                }}
              >
                <NavLink onClick={logout} to="/">
                  Log Out
                </NavLink>
              </Button>
            </>
          ) : (
            <>
              <Button
                as="a"
                fontSize="sm"
                fontWeight={400}
                variant="link"
                href="#"
              >
                <NavLink to="/login">Log In</NavLink>
              </Button>

              <Button
                display={{ base: "none", md: "inline-flex" }}
                fontSize="sm"
                fontWeight={600}
                color="white"
                bg="yellow.400"
                href="#"
                _hover={{
                  bg: "yellow.200",
                }}
              >
                Sign Up
              </Button>
            </>
          )}
          {/* TEST */}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const { user } = useContext(AuthContext);
  const linkColor = "gray.600";

  return (
    <Stack direction={"row"} spacing={4}>
      <Box>
        <Button
          as="a"
          fontSize="sm"
          fontWeight={800}
          variant="link"
          href="#"
          color="white"
        >
          <NavLink
            to="/weeks"
            p={3}
            fontSize={"sm"}
            fontWeight={100}
            color={linkColor}
          >
            Treatment Plan
          </NavLink>
        </Button>
      </Box>
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack bg="white" p={3} display={{ md: "none" }}>
      <Flex
        flexDirection="column"
        py={2}
        as={Link}
        href={"#"}
        justify={"space-between"}
        align={"center"}
      >
        <NavLink to="profile" as={Link} p={3} fontSize={"sm"} fontWeight={700}>
          Profile
        </NavLink>
        <NavLink to="weeks" as={Link} p={3} fontSize={"sm"} fontWeight={700}>
          Treatment Plan
        </NavLink>
      </Flex>
    </Stack>
  );
};

export default Navigation;

// CHAKRAS

// import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { FaBars } from "react-icons/fa";
// import { useLocation } from "react-router-dom";

// // chakra
// import { Flex, Button, IconButton } from "@chakra-ui/react";
// import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

// function Nav() {
//   const [display, setDisplay] = useState("none");

//   return (
//     <Flex>
//       <Flex align="center" bgColor="gray.50" position="fixed">
//         {/* Desktop */}
//         <Flex display={["none", "none", "flex", "flex"]}>
//           <Link href="/" passHref>
//             <Button as="a" variant="ghost" aria-label="Home" my={5} w="100%">
//               Home
//             </Button>
//           </Link>
//           <Link href="/" passHref>
//             <Button as="a" variant="ghost" aria-label="Home" my={5} w="100%">
//               About
//             </Button>
//           </Link>
//           <Link href="/" passHref>
//             <Button as="a" variant="ghost" aria-label="Home" my={5} w="100%">
//               Contact
//             </Button>
//           </Link>
//         </Flex>
//         <IconButton
//           aria-label="Open Menu"
//           mt={2}
//           mr={2}
//           ml={2}
//           icon={<HamburgerIcon />}
//           display={["flex", "flex", "none", "none"]}
//           onClick={() => setDisplay("flex")}
//         />
//       </Flex>
//       {/* Mobile nav */}
//       <Flex
//         w="100vw"
//         bgColor="gray.50"
//         zIndex={20}
//         h="100vh"
//         pos="fixed"
//         top="0"
//         left="0"
//         overflowY="auto"
//         flexDir="column"
//         display={display}
//       >
//         <Flex justify="flex-end">
//           <IconButton
//             mt={2}
//             mr={2}
//             aria-label="Close Menu"
//             icon={<CloseIcon />}
//             onClick={() => setDisplay("none")}
//           />
//         </Flex>
//         <Flex flexDir="column" align="center">
//           <Link href="/" passHref>
//             <Button as="a" variant="ghost" aria-label="Home" my={5} w="100%">
//               Home
//             </Button>
//           </Link>
//           <Link href="/" passHref>
//             <Button as="a" variant="ghost" aria-label="Home" my={5} w="100%">
//               About
//             </Button>
//           </Link>
//           <Link href="/" passHref>
//             <Button as="a" variant="ghost" aria-label="Home" my={5} w="100%">
//               Contact
//             </Button>
//           </Link>
//         </Flex>
//       </Flex>
//     </Flex>
//   );
// }

// export default Nav;

// // Old

// import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { FaBars } from "react-icons/fa";
// import { useLocation } from "react-router-dom";

// function Nav() {
//   const { user } = useContext(AuthContext);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const { logout } = useContext(AuthContext);

//   let location = useLocation();
//   console.log("location", location.pathname);

//   const handleToggle = () => {
//     setMobileMenuOpen((prev) => !prev);
//   };

//   // Implement later
//   // const closeMenu = () => {
//   //   setMobileMenuOpen(false);
//   // };

//   return (
//     <nav className="bg-gray-200">
//       <div className="max-w-6xl mx-auto px-5">
//         <div className="flex justify-between">
//           <div className="flex space-x-3">
//             {/* logo */}
//             <div className="flex items-center py-4 px-1  text-gray-700 hover:text-gray-900">
//               <Link to="/">Logo</Link>
//             </div>

//             {/* primary nav */}
//             <div className="hidden md:flex items-center space-x-4">
//               <Link
//                 className="py-4 px-1 text-black text-gray-700 hover:text-gray-900"
//                 to="/weeks"
//               >
//                 Treatment Plan
//               </Link>
//             </div>
//           </div>
//           {/* secondary nan */}
//           <div className="hidden md:flex items-center space-x-1">
//             <Link className="py-5 px-1" to="/profile">
//               Profile
//             </Link>
//             {user ? (
//               <Link
//                 className="py-1 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-800 hover:text-yellow-800 rounded shadow transition duration-400"
//                 to="/"
//                 onClick={logout}
//               >
//                 logout
//               </Link>
//             ) : (
//               <Link
//                 className="py-1 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-800 hover:text-yellow-800 rounded shadow transition duration-400"
//                 to="/login"
//               >
//                 login
//               </Link>
//             )}
//           </div>

//           {/* Mobile button goes here */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={handleToggle}
//               className="mobile-menu-button"
//               type=""
//             >
//               <FaBars className="w-6 h-6" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu*/}
//       <div className="md:hidden">
//         <Link
//           className={`mobile-menu ${
//             mobileMenuOpen
//               ? "block py-2 px-4 text-sm hover:bg-gray-300"
//               : "hidden block py-2 px-4 text-sm hover:bg-gray-300"
//           }`}
//           to="/weeks"
//         >
//           Treatment Plan
//         </Link>
//         <Link
//           className={`mobile-menu ${
//             mobileMenuOpen
//               ? "block py-2 px-4 text-sm hover:bg-gray-300"
//               : "hidden block py-2 px-4 text-sm hover:bg-gray-300"
//           }`}
//           to="/profile"
//         >
//           Profile
//         </Link>
//       </div>
//     </nav>
//   );
// }

// export default Nav;
