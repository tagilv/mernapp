import React from "react";
import { useLocation, useParams } from "react-router-dom";
import TreatmentWeek from "../components/TreatmentWeek.js";

function Week() {
  const data = useLocation();
  console.log("data", data.state.data);
  return (
    <h2>Singel week</h2>

    // limk to exercises
    // <TreatmentWeek key={treatmentWeek._id} treatmentWeek={treatmentWeek} />
  );
}

export default Week;
