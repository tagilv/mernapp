import "./App.css";
import { useEffect } from "react";

function App() {
  const getWeeks = async () => {
    const response = await fetch("http://localhost:5000/api/weeks/all");
    const results = await response.json();
    console.log("results>>", results);
  };

  useEffect(() => {
    getWeeks();
  }, []);

  return <div className="App"></div>;
}

export default App;
