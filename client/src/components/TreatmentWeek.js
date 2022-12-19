import React from "react";
import { Link } from "react-router-dom";

function TreatmentWeek({ treatmentWeek }) {
  return (
    <div className="flex justify-center py-6">
      <div className="block p-6 rounded-lg shadow-lg bg-white w-5/6">
        Treatment Week {treatmentWeek.week}
      </div>
    </div>
  );
}

export default TreatmentWeek;
