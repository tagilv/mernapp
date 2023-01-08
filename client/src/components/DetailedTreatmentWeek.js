import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";

function DetailedTreatmentWeek({ weekDetails }) {
  return (
    <div>
      <div>
        {weekDetails &&
          weekDetails.exercises.map((exercise) => {
            return (
              <div>
                <p>image goes here</p>
                <p>{exercise.description}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default DetailedTreatmentWeek;

// import {
//   Tabs,
//   TabList,
//   TabPanels,
//   Tab,
//   TabPanel,
//   Accordion,
//   AccordionItem,
//   AccordionButton,
//   AccordionIcon,
//   Box,
//   AccordionPanel,
// } from "@chakra-ui/react";

{
  /* <Accordion defaultIndex={[0]} allowMultiple>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex="1" textAlign="left">
          Section 1 title
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex="1" textAlign="left">
          Section 2 title
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </AccordionPanel>
  </AccordionItem>
</Accordion>; */
}
