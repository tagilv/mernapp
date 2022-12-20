import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Comments from "../components/Comments.js";
import DetailedTreatmentWeek from "../components/DetailedTreatmentWeek.js";
import useWeekDetails from "../utils/useWeekDetails.js";

function Week() {
  const { week } = useParams();

  // Custom Hook
  const { weekDetails, getWeekDetails } = useWeekDetails();

  useEffect(() => {
    getWeekDetails(week);
  }, []);

  return (
    <>
      <h2>Week Comp</h2>
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
