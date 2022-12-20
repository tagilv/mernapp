import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  HStack,
  Icon,
} from "@chakra-ui/react";

// export const ListItem = () => {
//   return (
//     <HStack>
//       <Icon />
//       <Text>Hello</Text>
//     </HStack>
//   );
// };

function TreatmentWeek({ treatmentWeek }) {
  return (
    <Box
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

        <Box bg="lightgray" p="60px">
          <Text fontSize="18px" fontweight="300" m="8px">
            Treatment Week {treatmentWeek.week}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default TreatmentWeek;
