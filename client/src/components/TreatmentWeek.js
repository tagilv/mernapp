import React from "react";

function TreatmentWeek({ treatmentWeek }) {
  return (
    <>
      {treatmentWeek.exercises?.map((excercise) => {
        return (
          <React.Fragment style={{ border: "solid" }}>
            <p>{treatmentWeek._id}</p>
            <p>{excercise.description}</p>
          </React.Fragment>
        );
      })}
    </>
  );
}

export default TreatmentWeek;

// import React from "react";

// function TreatmentWeek({ treatmentWeek }) {
//   return <p>{treatmentWeek.week}</p>;
// }

// export default TreatmentWeek;
