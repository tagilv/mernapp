import React from "react";
import { Link } from "react-router-dom";

function TreatmentWeek({ treatmentWeek }) {
  return (
    <>
      {treatmentWeek.exercises?.map((excercise) => {
        return (
          <React.Fragment style={{ border: "solid" }}>
            <Link to={treatmentWeek._id}>Week {treatmentWeek.week}</Link>
            <p>{treatmentWeek._id}</p>
            <p>{excercise.description}</p>
          </React.Fragment>
        );
      })}
    </>
  );
}

export default TreatmentWeek;
