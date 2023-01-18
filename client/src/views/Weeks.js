import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import TreatmentWeek from "../components/TreatmentWeek.js";
import getToken from "../utils/getToken.js";

import { Box, Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext.js";

function Weeks() {
  const token = getToken();
  const { server } = useContext(AuthContext);
  const [treatmentWeeks, setTreatmentWeeks] = useState("");
  const [week, setWeek] = useState(null);
  const getWeeks = async () => {
    try {
      const response = await fetch(
        `${server}/api/weeks/all`
        // "http://localhost:5000/api/weeks/all",
        // ,{
        //   headers: { Authorization: `Bearer ${token}` },
        // }
      );

      const results = await response.json();
      console.log("results>>", results);
      setTreatmentWeeks(results.data);
      console.log("results.data>>", results.data);
    } catch (error) {
      console.log("error fetching getWeeks>>", error);
      // setTreatmentWeeks([{ error: "you need to login first" }]);
    }
  };

  useEffect(() => {
    getWeeks();
  }, []);

  return (
    <>
      {" "}
      {treatmentWeeks ? (
        <Box align={"center"} minH="100vh">
          <Box
            py={{ base: 8, md: 20 }}
            as="section"
            bg="ofwhite"
            pt="28px"
            pb="28"
            maxW={{ base: "90%", md: "85%", lg: "80%" }}
            textAlign={["left", "center", "center"]}
          >
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
              m="8px"
            >
              Your 8 Week Excercise Plan
            </Heading>
            <Text
              fontWeight="small"
              fontSize={["lg", "xl", "2xl"]}
              pt="4px"
              pb="8"
              m="8px"
            ></Text>
            {treatmentWeeks &&
              treatmentWeeks.map((treatmentWeek, i) => {
                return (
                  <TreatmentWeek
                    key={treatmentWeek._id}
                    treatmentWeek={treatmentWeek}
                  />
                );
              })}
          </Box>
        </Box>
      ) : (
        <Box align={"center"}>
          <Box
            as="section"
            bg="ofwhite"
            pt="28px"
            pb="20"
            v
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
    </>
  );
}

export default Weeks;

// {
//   treatmentWeeks &&
//     treatmentWeeks.map((treatmentWeek, i) => {
//       return (
//         <TreatmentWeek
//           key={treatmentWeek._id}
//           treatmentWeek={treatmentWeek}
//         />
//       );
//     });
// }
