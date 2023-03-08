import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import getToken from "./getToken";
import { server } from "../utils/server";

function useWeekDetails() {
  const [weekDetails, setWeekDetails] = useState("");
  const token = getToken();

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
  return {
    weekDetails,
    getWeekDetails,
  };
}
export default useWeekDetails;
