import React from "react";
import {
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  Box,
  AccordionPanel,
} from "@chakra-ui/react";

import RyggskolanHero from "../assets/RyggskolanHero.png";

function DetailedTreatmentWeek({ weekDetails }) {
  return (
    <div>
      <Box>
        <Box
          position={"relative"}
          p={"4"}
          height={"300px"}
          width={"full"}
          overflow={"hidden"}
        >
          <Image
            alt={"Hero Image"}
            rounded={"2xl"}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={"100%"}
            src={RyggskolanHero}
          />
        </Box>
      </Box>

      {weekDetails &&
        weekDetails.exercises.map((exercise) => {
          return (
            <Box align={"center"} rounded={"2xl"}>
              <Box
                ps={"4"}
                rounded={"2xl"}
                overflow="hidden"
                variant="outline"
                as="section"
                bg="ofwhite"
                // maxW={{ base: "90%", md: "85%", lg: "80%" }}
              >
                <div>
                  <Accordion allowMultiple>
                    <AccordionItem>
                      <h2>
                        <AccordionButton rounded={"2xl"}>
                          <Box as="span" flex="1" textAlign="left">
                            <Text fontSize="sm">
                              Exercise {exercise.exerciseNumber}
                            </Text>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <Text fontSize="sm">{exercise.description}</Text>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </div>
              </Box>
            </Box>
          );
        })}
    </div>
  );
}

export default DetailedTreatmentWeek;
