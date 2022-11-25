import "./App.css";
import { useEffect, useState } from "react";
import TreatmentWeek from "./components/TreatmentWeek.js";

function App() {
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
      {/* <div>
        {treatmentWeeks &&
          treatmentWeeks.map((treatmentWeek) => {
            <p>{treatmentWeek.week}</p>;
            { treatmentWeek.excercises(map((excercise)) => {
            return (<p>{ excercise.description}</p>)
            })}
          })}
      </div> */}
      {/* <div>
        {treatmentWeeks &&
          treatmentWeeks.map((treatmentWeek) => {
            return treatmentWeek.exercises?.map((exercise) => {
              return <p>{exercise.description}</p>;
            });
          })}
      </div> */}

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

export default App;

//   {/* {Object.entries(treatmentWeeks).map((treatmentWeek) => {
//     return <TreatmentWeek treatmentWeek={treatmentWeek} />;
//   })} */}
