import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import getToken from "./getToken";
import { server } from "../utils/server";

function useWeekDetails() {
  const [weekDetails, setWeekDetails] = useState("");
  const token = getToken();

  // const { server } = useContext(AuthContext);

  const getWeekDetails = async (week) => {
    console.log("week>>>>", week);
    try {
      const response = await fetch(
        `${server}/api/weeks/all/${week}`,
        // `http://localhost:5000/api/weeks/all/${week}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const results = await response.json();
      console.log("results>>", results);
      console.log("results.requestedWeek>>", results.requestedWeek);
      console.log("results.requestedWeek[0]>>", results.requestedWeek[0]);
      setWeekDetails(results.requestedWeek[0]);
    } catch (error) {
      console.log("error fetching weekly excercises>>", error);
    }
  };

  // return object
  // us the feature of the react componse without returning jsx. Alows us to have a shared state that all coponetns can tap into\
  // We dont want other compinets to be abelt o update the state of this
  // Create handler here if you want to update stae of here

  return {
    weekDetails,
    getWeekDetails,
  };
}
export default useWeekDetails;
