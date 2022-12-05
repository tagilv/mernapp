import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./views/Home";
import Weeks from "./views/Weeks";
import Week from "./views/Week";
import Nav from "./components/Nav";
import Profile from "./views/Profile";
import Register from "./views/Register";
import { AuthContextProvider } from "./context/AuthContext";
import Login from "./views/Login";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/weeks" element={<Weeks />} />
          <Route path="/week" element={<Week />} />
          <Route path="/weeks/:weekNumber" element={<Week />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
