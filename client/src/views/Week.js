import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Comments from "../components/Comments.js";
import DetailedTreatmentWeek from "../components/DetailedTreatmentWeek.js";

function Week() {
  const data = useLocation();
  // console.log("data.state", data.state);
  // console.log("data.state.data", data.state.data);
  // console.log("data.state.data._id", data.state.data._id);
  // let individualWeekId = data.state.data._id;

  // Use Params
  const { week } = useParams();

  // Here I need to fetch again

  const [weekDetails, setWeekDetails] = useState("");

  useEffect(() => {
    const getWeekDetails = async () => {
      console.log(week);
      try {
        const response = await fetch(
          `http://localhost:5000/api/weeks/all/${week}`
        );
        const results = await response.json();
        console.log("results>>", results);
        console.log("results.requestedWeek>>", results.requestedWeek);
        console.log("results.requestedWeek[0]>>", results.requestedWeek[0]);
        setWeekDetails(results.requestedWeek[0]);
        // console.log("results.data>>", results.data);
        console.log("WEEK DATA WITH COMMENTS?", results.requestedWeek[0]);
      } catch (error) {
        console.log("error fetching weekly excercises>>", error);
      }
    };
    getWeekDetails();
  }, []);
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
      <Comments />
    </>
  );
}

export default Week;
