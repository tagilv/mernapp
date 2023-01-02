import React from "react";
import {
  Image,
  Heading,
  Stack,
  Text,
  Button,
  Box,
  Flex,
} from "@chakra-ui/react";

function Home() {
  return (
    <Box maxW="100%" align="center">
      <Box
        bg="ofwhite"
        maxW={{ base: "90%", md: "85%", lg: "80%" }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack
          align="center"
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: "column", md: "row" }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
            >
              <Text as={"span"} position={"relative"}>
                Improve your quality of life
              </Text>
              <br />
              <Text as={"span"} color={"red.400"}>
                in 8 short weeks
              </Text>
            </Heading>
            <Text textAlign={["left", "center", "center"]} color={"gray.500"}>
              Ryggskolan is an 8-week long program desinged by nurses and
              medical professionals at XX. The program is free and provides you
              with direct access to XX through a chat
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: "column", sm: "row" }}
              display={{ base: "flex", sm: "block" }}
            >
              <Button
                rounded={"full"}
                size={"lg"}
                fontWeight={"normal"}
                px={6}
                colorScheme={"red"}
                bg={"red.400"}
                _hover={{ bg: "red.500" }}
              >
                Get started
              </Button>
              <Button
                rounded={"full"}
                size={"lg"}
                fontWeight={"normal"}
                px={6}
                _hover={{ bg: "gray.300" }}
              >
                How it works
              </Button>
            </Stack>
          </Stack>
          <Flex
            flex={1}
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
          >
            <Box
              position={"relative"}
              height={"300px"}
              rounded={"2xl"}
              boxShadow={"2xl"}
              width={"full"}
              overflow={"hidden"}
            >
              <Image
                alt={"Hero Image"}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={"100%"}
                src={
                  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
                }
              />
            </Box>
          </Flex>
        </Stack>
      </Box>
    </Box>
  );
}

export default Home;
