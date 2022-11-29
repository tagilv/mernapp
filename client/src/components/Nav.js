import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <>
        <h2>Nav</h2> <Link to="/">Home</Link> | <Link to="/weeks">Weeks</Link>
      </>
    </nav>
  );
}

export default Nav;
