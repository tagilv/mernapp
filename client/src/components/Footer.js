import React from "react";
import { NavLink } from "react-router-dom";

import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";

function Footer() {
  return (
    <footer>
      <Box
        bg={useColorModeValue("gray.50", "gray.900")}
        color={useColorModeValue("gray.700", "gray.200")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Stack direction={"row"} spacing={6}>
            <NavLink to="/">Home</NavLink>;<NavLink to="/">About</NavLink>;
            <NavLink to="/">Contact</NavLink>;
          </Stack>
          <Text>© 2022 Ryggskolan</Text>
        </Container>
      </Box>
    </footer>
  );
}

export default Footer;
