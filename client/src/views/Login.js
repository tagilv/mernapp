import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { login, userLogin, setUserLogin, logout } = useContext(AuthContext);

  // const [userLogin, setUserLogin] = useState({});

  const handleChangeHandler = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  // const login = async () => {
  //   console.log("userLogin", userLogin);

  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  //   const urlencoded = new URLSearchParams();
  //   urlencoded.append("email", userLogin.email);
  //   urlencoded.append("password", userLogin.password);

  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: urlencoded,
  //     redirect: "follow",
  //   };

  //   try {
  //     const response = await fetch(
  //       "http://localhost:5000/api/users/login",
  //       requestOptions
  //     );
  //     const result = await response.json();
  //     //find token (same as result.token)
  //     console.log("result", result);
  //     const { token } = result;
  //     if (token) {
  //       localStorage.setItem("token", token);
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  // const logout = () => {
  //   const { logout } = useContext(AuthContext);

  //   localStorage.removeItem("token");
  //   setUserLogin(false);
  //   console.log("user logged out");
  // };

  return (
    <div>
      <h2>Login Page</h2>
      <div>
        <label htmlFor="email">email</label>
        <input
          id="email"
          type="text"
          name="email"
          value={userLogin.email ? userLogin.email : ""}
          onChange={handleChangeHandler}
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          id="password"
          type="text"
          name="password"
          value={userLogin.password ? userLogin.password : ""}
          onChange={handleChangeHandler}
        />
      </div>
      <button onClick={login}>login</button>
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default Login;
