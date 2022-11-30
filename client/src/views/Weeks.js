import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TreatmentWeek from "../components/TreatmentWeek.js";

function Weeks() {
  const [treatmentWeeks, setTreatmentWeeks] = useState("");
  const [week, setWeek] = useState(null);
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
        {/* <button onClick={() => setWeek(1)}>Week1</button>
        <button onClick={() => setWeek(2)}>Week2</button>

        {week && <SingleWeek treatmentWeek={treatmentWeeks[week]} />} */}

        {treatmentWeeks &&
          treatmentWeeks.map((treatmentWeek, i) => {
            return (
              <Link
                to={`${treatmentWeek.week}`}
                state={{ data: treatmentWeek }}
              >
                <TreatmentWeek
                  key={treatmentWeek._id}
                  treatmentWeek={treatmentWeek}
                />
              </Link>
            );
          })}
      </div>
    </>
  );
}

export function SingleWeek({ treatmentWeek }) {
  console.log("treatmentWeek", treatmentWeek);
  return (
    <div>
      <p>{treatmentWeek.week}</p>
    </div>
  );
}

export default Weeks;
