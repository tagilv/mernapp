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
        bg="ofwhite"
        pt="28px"
        pb="28"
        px={["10px", "null", "170px"]}
        textAlign={["left", "center", "center"]}
      >
        <Heading
          fontWeight="extrabold"
          fontSize={["3xl", "4xl", "5xl"]}
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
    </>
  );
}

export default Weeks;
