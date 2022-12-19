import React from "react";

function DetailedTreatmentWeek({ weekDetails }) {
  return (
    <div>
      <div className="flex-row justify-center py-6 px-10">
        {weekDetails &&
          weekDetails.exercises.map((exercise) => {
            return (
              <div className="flex py-6 px-6 rounded-lg shadow-lg bg-white">
                <p className="px-6">image goes here</p>
                <p className="text-left">{exercise.description}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default DetailedTreatmentWeek;
