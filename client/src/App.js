import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import Weeks from "./views/Weeks";
import Week from "./views/Week";
import Nav from "./components/Nav";
import Profile from "./views/Profile";
import Register from "./views/Register";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/weeks" element={<Weeks />} />
        <Route path="/week" element={<Week />} />
        <Route path="/weeks/:weekNumber" element={<Week />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
