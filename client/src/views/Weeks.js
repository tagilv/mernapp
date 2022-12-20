import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import TreatmentWeek from "../components/TreatmentWeek.js";
import getToken from "../utils/getToken.js";

import { Box, Heading, Text } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext.js";

function Weeks() {
  const token = getToken();
  const { server } = useContext(AuthContext);
  const [treatmentWeeks, setTreatmentWeeks] = useState("");
  const [week, setWeek] = useState(null);
  const getWeeks = async () => {
    try {
      const response = await fetch(
        `${server}/api/weeks/all`,
        // "http://localhost:5000/api/weeks/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const results = await response.json();
      console.log("results>>", results);
      setTreatmentWeeks(results.data);
      console.log("results.data>>", results.data);
    } catch (error) {
      console.log("error fetching getWeeks>>", error);
    }
  };

  useEffect(() => {
    getWeeks();
  }, []);

  return (
    <>
      <Box
        as="section"
        bg="lightblue"
        pt="28px"
        pb="28"
        px="8"
        textAlign={["left", "left", "center"]}
      >
        <Heading
          fontWeight="extrabold"
          fontSize={["3xl", "3xl", "5xl"]}
          m="8px"
        >
          Your 8 week excercise Plan
        </Heading>
        <Text
          fontWeight="small"
          fontSize={["lg", "lg", "2xl"]}
          pt="4px"
          m="8px"
        >
          Chat to your nurse found below
        </Text>
        {treatmentWeeks &&
          treatmentWeeks.map((treatmentWeek, i) => {
            return (
              <NavLink
                to={`${treatmentWeek.week}`}
                state={{ data: treatmentWeek }}
              >
                <TreatmentWeek
                  key={treatmentWeek._id}
                  treatmentWeek={treatmentWeek}
                />
              </NavLink>
            );
          })}
      </Box>
    </>
  );
}

export default Weeks;
