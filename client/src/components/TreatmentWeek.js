import React from "react";

function TreatmentWeek({ treatmentWeek }) {
  return (
    <>
      {treatmentWeek.excercises?.map((excercise) => {
        return (
          <>
            <p>{excercise.description}</p>
          </>
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
