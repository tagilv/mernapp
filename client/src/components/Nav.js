import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Nav() {
  const { user } = useContext(AuthContext);
  return (
    <nav>
      <>
        {user && <p>Hi you {user.email}</p>}
        <h2>Nav</h2> <Link to="/">Home</Link> | <Link to="/weeks">Weeks</Link>|{" "}
        <Link to="/profile">Profile</Link> |{" "}
        <Link to="/register">register</Link> | <Link to="/login">login</Link>
      </>
    </nav>
  );
}

export default Nav;
