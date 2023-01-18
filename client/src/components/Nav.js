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
  useColorModeValue,
  WrapItem,
  Image,
  ButtonGroup,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";

import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaBars } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import Ryggskolan from "../assets/Ryggskolan.png";

// Token is there to recognie that you are logged in after closing andmopenring a session
// import getToken from "../utils/getToken.js";

function Navigation() {
  // const token = getToken();
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
            <NavLink to="/">
              <Image src={Ryggskolan} boxSize="30px" alt="Dan Abramov" />
            </NavLink>
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
                <NavLink to="/profile">
                  <WrapItem>
                    <Avatar size="sm" src={user.avatarPicture} />{" "}
                  </WrapItem>
                </NavLink>
              </Button>

              <NavLink onClick={logout} to="/">
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
                  Log Out
                </Button>
              </NavLink>
            </>
          ) : (
            <>
              <ButtonGroup spacing="1">
                <Button
                  fontSize="sm"
                  size={{ base: "xs", md: "sm" }}
                  fontWeight={600}
                  color="white"
                  variant="link"
                  href="#"
                >
                  <NavLink to="/login">Log In</NavLink>
                </Button>

                <Button
                  display={{ base: "inline-flex", md: "inline-flex" }}
                  fontSize="sm"
                  size={{ base: "xs", md: "sm" }}
                  fontWeight={600}
                  color="white"
                  bg="yellow.400"
                  href="#"
                  _hover={{
                    bg: "yellow.200",
                  }}
                >
                  <NavLink to="/register">Sign Up</NavLink>
                </Button>
              </ButtonGroup>
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
  const { logout } = useContext(AuthContext);
  return (
    <Stack bg="white" display={{ md: "none" }}>
      <Box p={2} display={{ md: "none" }}>
        <Stack as={"nav"}>
          <Link
            _hover={{
              textDecoration: "none",
              bg: useColorModeValue("gray.200", "gray.700"),
            }}
            to="weeks"
            as={NavLink}
            p={3}
            fontSize={"sm"}
            fontWeight={800}
          >
            Treatment Plan
          </Link>
          <Link
            to="profile"
            as={NavLink}
            p={3}
            fontSize={"sm"}
            fontWeight={800}
            _hover={{
              textDecoration: "none",
              bg: useColorModeValue("gray.200", "gray.700"),
            }}
          >
            Profile
          </Link>
          <Link
            _hover={{
              textDecoration: "none",
              bg: useColorModeValue("gray.200", "gray.700"),
            }}
            to="/"
            as={NavLink}
            p={3}
            fontSize={"sm"}
            fontWeight={800}
          >
            Home
          </Link>
          <Link
            onClick={logout}
            _hover={{
              textDecoration: "none",
              bg: useColorModeValue("gray.200", "gray.700"),
            }}
            to="/login"
            as={NavLink}
            p={3}
            fontSize={"sm"}
            fontWeight={800}
          >
            Logout
          </Link>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Navigation;

// POST

// import { ReactNode } from "react";
// import {
//   Box,
//   Flex,
//   Avatar,
//   HStack,
//   Link,
//   IconButton,
//   Button,
//   Menu,
//   MenuButton,
//   useDisclosure,
//   useColorModeValue,
//   Stack,
// } from "@chakra-ui/react";
// import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

// const Links = ["Treatment Plan", "Profile"];

// const NavLink = ({ children }: { children: ReactNode }) => (
//   <Link
//     px={2}
//     py={2}
//     rounded={"md"}
//     _hover={{
//       textDecoration: "none",
//       bg: useColorModeValue("gray.200", "gray.700"),
//     }}
//     href={"#"}
//   >
//     {children}
//   </Link>
// );

// export default function Simple() {
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   return (
//     <>
//       <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
//         <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
//           <IconButton
//             size={"md"}
//             icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
//             aria-label={"Open Menu"}
//             display={{ md: "none" }}
//             onClick={isOpen ? onClose : onOpen}
//           />
//           <HStack spacing={8} alignItems={"center"}>
//             <Box>Logo</Box>
//             <HStack
//               as={"nav"}
//               spacing={4}
//               display={{ base: "none", md: "flex" }}
//             >
//               {Links.map((link) => (
//                 <NavLink key={link}>{link}</NavLink>
//               ))}
//             </HStack>
//           </HStack>
//           <Flex alignItems={"center"}>
//             <Menu>
//               <MenuButton
//                 as={Button}
//                 rounded={"full"}
//                 variant={"link"}
//                 cursor={"pointer"}
//                 minW={0}
//               >
//                 <Avatar
//                   size={"sm"}
//                   src={
//                     "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
//                   }
//                 />
//               </MenuButton>
//             </Menu>
//           </Flex>
//         </Flex>

//         {isOpen ? (
//           <Box pb={4} display={{ md: "none" }}>
//             <Stack as={"nav"} spacing={4}>
//               {Links.map((link) => (
//                 <NavLink key={link}>{link}</NavLink>
//               ))}
//             </Stack>
//           </Box>
//         ) : null}
//       </Box>
//     </>
//   );
// }
