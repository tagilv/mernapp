import React from "react";

function DetailedTreatmentWeek({ weekDetails }) {
  return (
    <div>
      <div>
        {weekDetails &&
          weekDetails.exercises.map((exercise) => {
            return (
              <div>
                <p>image goes here</p>
                <p>{exercise.description}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default DetailedTreatmentWeek;
