import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import Weeks from "./views/Weeks";
import Week from "./views/Week";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Weeks" element={<Weeks />} />
        <Route path="/Week" element={<Week />} />
        <Route path="/Weeks/:weekNumber" element={<Week />} />
      </Routes>
    </div>
  );
}

export default App;
