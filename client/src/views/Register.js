import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Register() {
  const { newUser, setNewUser, signUp } = useContext(AuthContext);

  const handleChangeHandler = (e) => {
    console.log(
      "[e.target.name]: e.target.value",
      e.target.name,
      e.target.value
    );
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Register Page</h2>
      <div>
        <label htmlFor="userName">username</label>
        <input
          id="username"
          type="text"
          name="userName"
          // The value of my input is what I am going to store in the new user, if there is no new user, leave empty. Otherwise will have an error in the begining when there is no information in my new user.
          value={newUser.userName ? newUser.userName : ""}
          onChange={handleChangeHandler}
        />
      </div>
      <div>
        <label htmlFor="email">email</label>
        <input
          id="email"
          type="text"
          name="email"
          value={newUser.email ? newUser.email : ""}
          onChange={handleChangeHandler}
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          id="password"
          type="text"
          name="password"
          value={newUser.password ? newUser.password : ""}
          onChange={handleChangeHandler}
        />
      </div>
      <button onClick={signUp}>Sign Up</button>
    </div>
  );
}

export default Register;
