import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TreatmentWeek from "../components/TreatmentWeek.js";
import getToken from "../utils/getToken.js";

function Weeks() {
  const token = getToken();
  const [treatmentWeeks, setTreatmentWeeks] = useState("");
  const [week, setWeek] = useState(null);
  const getWeeks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/weeks/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const results = await response.json();
      console.log("results>>", results);
      setTreatmentWeeks(results.data);
      console.log("results.data>>", results.data);
    } catch (error) {
      console.log("error fetching getWeeks>>", error);
    }
  };

  useEffect(() => {
    getWeeks();
  }, []);

  return (
    <>
      <div className="App h-screen">
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

export default Weeks;
