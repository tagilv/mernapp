import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Comments from "../components/Comments.js";
import DetailedTreatmentWeek from "../components/DetailedTreatmentWeek.js";

import { getWeekDetails } from "../utils/getComments.js";

function Week() {
  const { week } = useParams();
  console.log("week in week component>>>>>", week);
  const [weekDetails, setWeekDetails] = useState("");

  // Need to send the week as argument here
  const getWeekDetailsHelper = async (week) => {
    let data = await getWeekDetails(week);
    console.log("data from getComments.js helper/fetch", data);
    setWeekDetails(data.requestedWeek[0]);
  };

  useEffect(() => {
    // Need to send the week as argument here
    getWeekDetailsHelper(week);
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
