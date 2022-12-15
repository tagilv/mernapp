import React, { useState } from "react";

function useWeekDetails() {
  const [weekDetails, setWeekDetails] = useState("");

  const getWeekDetails = async (week) => {
    console.log("week>>>>", week);
    try {
      const response = await fetch(
        `http://localhost:5000/api/weeks/all/${week}`
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
  return {
    weekDetails,
    getWeekDetails,
  };
}
export default useWeekDetails;
