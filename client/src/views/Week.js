import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Comments from "../components/Comments.js";
import DetailedTreatmentWeek from "../components/DetailedTreatmentWeek.js";

import useWeekDetails from "../utils/useWeekDetails.js";

function Week() {
  const { week } = useParams();
  console.log("week in week component>>>>>", week);

  // Create Custom hook
  const { weekDetails, getWeekDetails } = useWeekDetails();

  useEffect(() => {
    getWeekDetails(week);
  }, []);

  // Want to use this when you post the, move separate and export and then call
  console.log("weekDetails>>", weekDetails);

  return (
    // Dont do && cause then you can do condtional. Fetc/db call here so you dotn know if youll have weekdetials but i its child you will a;ways have it
    // Pure data getting and then pure rendering
    <>
      {weekDetails ? (
        <DetailedTreatmentWeek weekDetails={weekDetails} />
      ) : (
        <p>loading</p>
      )}
      <Comments weekDetails={weekDetails} />
    </>
  );
}

export default Week;
