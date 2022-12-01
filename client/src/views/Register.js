import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Register() {
  // const [newUser, setNewUser] = useState({});
  const { newUser, setNewUser } = useContext(AuthContext);

  const handleChangeHandler = (e) => {
    console.log(
      "[e.target.name]: e.target.value",
      e.target.name,
      e.target.value
    );
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const signUp = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", newUser.email);
    urlencoded.append("password", newUser.password);
    urlencoded.append("userName", newUser.userName);
    urlencoded.append(
      "avatarPicture",
      newUser.avatarPicture
        ? newUser.avatarPicture
        : "https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/"
    );

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/signup",
        requestOptions
      );
      const result = await response.json();
      console.log("result>>", result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Register Page</h2>
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
