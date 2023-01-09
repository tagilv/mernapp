import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Comments from "../components/Comments.js";
import DetailedTreatmentWeek from "../components/DetailedTreatmentWeek.js";
import useWeekDetails from "../utils/useWeekDetails.js";

import { Box, Spinner, Stack } from "@chakra-ui/react";

function Week() {
  const { week } = useParams();

  // Custom Hook
  const { weekDetails, getWeekDetails } = useWeekDetails();

  useEffect(() => {
    getWeekDetails(week);
  }, []);

  return (
    <>
      {weekDetails ? (
        <DetailedTreatmentWeek weekDetails={weekDetails} />
      ) : (
        <Box align={"center"} minH="100vh">
          <Box
            as="section"
            bg="ofwhite"
            pt="28px"
            pb="20"
            maxW={{ base: "90%", md: "80%", lg: "70%" }}
            textAlign={["left", "center", "center"]}
            align={"center"}
          >
            <Stack direction="column" spacing={4} minH="500" align={"center"}>
              <Spinner
                align={"center"}
                thickness="4px"
                speed="0.645s"
                emptyColor="gray.200"
                color="#6B46C1"
                size="xl"
              />
            </Stack>
          </Box>
        </Box>
      )}
      <Comments weekDetails={weekDetails} />
    </>
  );
}

export default Week;
