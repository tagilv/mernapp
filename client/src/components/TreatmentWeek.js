import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  HStack,
  Icon,
  Card,
  Image,
  Stack,
  CardBody,
  CardFooter,
  Spacer,
} from "@chakra-ui/react";

import { NavLink } from "react-router-dom";

function TreatmentWeek({ treatmentWeek }) {
  console.log("treatmentWeek.week", treatmentWeek.exercisesImagesMain[0]);
  return (
    <Card
      mb="8"
      direction={["column", "row"]}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        maxH={{ base: "100%", sm: "200px" }}
        src={treatmentWeek.exercisesImagesMain[0]}
        alt=""
        m="10px"
      />

      <Stack>
        <CardBody>
          <Heading size="md"> Week {treatmentWeek.week}</Heading>

          <Text py="2">
            During this week we will focus on understanding where your pain lies
            and what small excercises you can perform at home to make your
            everday easier
            {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. */}
          </Text>
        </CardBody>
        <CardFooter mt="100px" direction="row" justifyContent="center">
          <Button variant="solid" colorScheme="purple">
            <NavLink
              to={`${treatmentWeek.week}`}
              state={{ data: treatmentWeek }}
            >
              To the exercises >
            </NavLink>
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
}

export default TreatmentWeek;

{
  /* <Box
  maxW="994px"
  margin="auto"
  borderRadius="16px"
  overflow="hidden"
  p="6"
  rounded="md"
  bg="white"
>
  <Flex direction={["column", "column", "row"]}>
    <Box bg="gray" p="60px">
      <Text fontSize="20px" fontweight="300" m="8px" mt="24px">
        Image here
      </Text>
      <Button colorScheme="purple" size="lg" w="160">
        Go to Week
      </Button>
    </Box>

    <Box bg="lightgray" pr="480px">
      <Text fontSize="18px" fontweight="300" m="8px">
        Treatment Week {treatmentWeek.week}
      </Text>
    </Box>
  </Flex>
</Box>; */
}

{
  /* <Card
  direction={{ base: "column", sm: "row" }}
  overflow="hidden"
  variant="outline"
>
  <Image
    objectFit="cover"
    maxW={{ base: "100%", sm: "200px" }}
    src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
    alt="Caffe Latte"
  />

  <Stack>
    <CardBody>
      <Heading size="md">The perfect latte</Heading>

      <Text py="2">
        Caffè latte is a coffee beverage of Italian origin made with espresso
        and steamed milk.
      </Text>
    </CardBody>

    <CardFooter>
      <Button variant="solid" colorScheme="blue">
        Buy Latte
      </Button>
    </CardFooter>
  </Stack>
</Card>; */
}

// <Box
//   maxW="994px"
//   margin="auto"
//   borderRadius="16px"
//   overflow="hidden"
//   p="6"
//   rounded="md"
//   bg="white"
// >
//   <Flex direction={["column", "column", "row"]}>
//     <Box bg="gray" p="60px">
//       <Text fontSize="20px" fontweight="300" m="8px" mt="24px">
//         Image here
//       </Text>
//       <Button colorScheme="purple" size="lg" w="160">
//         Go to Week
//       </Button>
//     </Box>

//     <Box bg="lightgray" pr="480px">
//       <Text fontSize="18px" fontweight="300" m="8px">
//         Treatment Week {treatmentWeek.week}
//       </Text>
//     </Box>
//   </Flex>
// </Box>;
