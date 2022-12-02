//1 Import Hook
import { createContext, useEffect, useState } from "react";
import getToken from "../utils/getToken";

//2 Create Context/Store

export const AuthContext = createContext();

//3 Create provider

export const AuthContextProvider = ({ children }) => {
  // REGISTER/SIGNUP
  const [newUser, setNewUser] = useState({});

  // LOGIN
  const [userLogin, setUserLogin] = useState({});
  const login = async () => {
    console.log("userLogin", userLogin);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", userLogin.email);
    urlencoded.append("password", userLogin.password);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/login",
        requestOptions
      );
      const result = await response.json();
      //find token (same as result.token)
      console.log("result", result);
      const { token } = result;
      if (token) {
        localStorage.setItem("token", token);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  //LOGOUT

  const logout = () => {
    localStorage.removeItem("token");
    setUserLogin(false);
    console.log("user logged out");
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ newUser, setNewUser, login, userLogin, setUserLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//4 Move state and function
