import React from "react";

function DetailedTreatmentWeek({ weekDetails }) {
  console.log("This is detiledtreatmentweek");
  return (
    <div className="h-screen">
      {weekDetails &&
        weekDetails.exercises.map((exercise) => {
          return <p>{exercise.description}</p>;
        })}
      {/* {weekDetails.comments} */}
      {/* {weekDetails &&
        weekDetails.comments.map((comments) => {
          return <p>{comments.text}</p>;
        })} */}
    </div>
  );
}

export default DetailedTreatmentWeek;
