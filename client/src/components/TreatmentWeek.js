import React from "react";
import { Link } from "react-router-dom";

function TreatmentWeek({ treatmentWeek }) {
  return (
    // <>
    //   {treatmentWeek.exercises?.map((excercise) => {
    //     return (
    <div style={{ border: "solid" }}>
      go to week {treatmentWeek.week}
      {/* <Link to={treatmentWeek._id}>Week {treatmentWeek.week}</Link> */}
      {/* <p>{treatmentWeek._id}</p> */}
      {/* <p>{excercise.description}</p> */}
    </div>
    //     );
    //   })}
    // </>
  );
}

export default TreatmentWeek;
