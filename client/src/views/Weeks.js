import React from "react";
import { useEffect, useState } from "react";
import TreatmentWeek from "../components/TreatmentWeek.js";

function Weeks() {
  const [treatmentWeeks, setTreatmentWeeks] = useState("");

  const getWeeks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/weeks/all");
      const results = await response.json();
      console.log("results>>", results);
      setTreatmentWeeks(results.data);
      console.log("results.data>>", results.data);
      // console.log("results.data>>", results.data[0].week);
    } catch (error) {
      console.log("error fetching getWeeks>>", error);
    }
  };

  useEffect(() => {
    getWeeks();
  }, []);

  return (
    <>
      <div className="App">
        {treatmentWeeks &&
          treatmentWeeks.map((treatmentWeek) => {
            {
              console.log("treatmentWeek>>>", treatmentWeek);
            }
            return (
              <TreatmentWeek
                key={treatmentWeek._id}
                treatmentWeek={treatmentWeek}
              />
            );
          })}
      </div>
    </>
  );
}

export default Weeks;
