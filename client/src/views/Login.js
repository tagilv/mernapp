import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext.js";

// When handling user input, do not put it in a context as it will trick the app that the user is logged in. Better to save in a state.

function Login() {
  const { login, logout } = useContext(AuthContext);

  const email = useRef();
  const password = useRef();

  return (
    <div>
      <h2>Login Page</h2>
      <div>
        <label htmlFor="email">email</label>
        <input id="email" type="text" name="email" ref={email} />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input id="password" type="text" name="password" ref={password} />
      </div>
      <button
        onClick={() => login(email.current.value, password.current.value)}
      >
        login
      </button>
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default Login;
