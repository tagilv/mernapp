import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext.js";
import { Link, NavLink } from "react-router-dom";

// When handling user input, do not put it in a context as it will trick the app that the user is logged in. Better to save in a state.

function Login() {
  const { login, logout } = useContext(AuthContext);

  const email = useRef();
  const password = useRef();

  return (
    <div className="h-screen container mx-auto px-4 bg-amber-100">
      <h2>Login Page</h2>
      <div>
        <label htmlFor="email">email</label>
        <input id="email" type="text" name="email" ref={email} />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input id="password" type="text" name="password" ref={password} />
      </div>
      <NavLink
        onClick={() => login(email.current.value, password.current.value)}
        to="/"
      >
        login
      </NavLink>
    </div>
  );
}

export default Login;

{
  /* <button onClick={logout}>logout</button> */
}
