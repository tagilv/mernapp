import React from "react";
import {
  Heading,
  Text,
  Button,
  Card,
  Image,
  Stack,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";

import { NavLink } from "react-router-dom";

function TreatmentWeek({ treatmentWeek }) {
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
        src={treatmentWeek?.exercisesImagesMain[0]}
        alt=""
        m="10px"
      />

      <Stack>
        <CardBody>
          <Heading size="md"> Week {treatmentWeek.week}</Heading>

          <Text py="2">{treatmentWeek.weekFocus}</Text>
        </CardBody>
        <CardFooter mt="100px" direction="row" justifyContent="center">
          <Button variant="solid" colorScheme="purple">
            <NavLink
              to={`${treatmentWeek.week}`}
              state={{ data: treatmentWeek }}
            >
              To the exercises
            </NavLink>
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
}

export default TreatmentWeek;
