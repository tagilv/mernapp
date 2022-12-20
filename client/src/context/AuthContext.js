import { createContext, useEffect, useState } from "react";
import getToken from "../utils/getToken.js";

// Create variable with the server info

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const server = "https://mernapp-8c92z90hd-tagilv.vercel.app";

  console.log("authcontext run");

  // USER state created here to be to set the user after login and then export value and use in other components in application
  const [user, setUser] = useState({});

  // Need to add the below when adding proteced routes to give time to get user
  // const [isLogged, setIsLogged] = useState(false);

  // REGISTER/SIGNUP
  const [newUser, setNewUser] = useState({});

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
        : "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
    );

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        `${server}/api/users/signup`,
        // "http://localhost:5000/api/users/signup",
        requestOptions
      );
      const result = await response.json();
      console.log("result>>", result);
    } catch (error) {
      console.log(error);
    }
  };

  //LOGIN
  const login = async (email, password) => {
    console.log("email, password>>>>", email, password);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", password);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        `${server}/api/users/login`,
        // "http://localhost:5000/api/users/login",
        requestOptions
      );
      const result = await response.json();
      //find token (same as result.token)
      console.log("result", result);
      const { token } = result;
      // set user
      if (token) {
        localStorage.setItem("token", token);
      }
      setUser(result.user);
      // Need to add the below when adding proteced routes to give time to get user
      // setIsLogged(true);
    } catch (error) {
      // Need to add the below when adding proteced routes to give time to get user
      // setIsLogged(true);
      console.log("error", error);
    }
  };

  //LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(false);
    console.log("user logged out");
  };

  // GET PROFILE

  const getProfile = async () => {
    const token = getToken();

    if (token) {
      // console.log("Profile loading");
      // if (token) {
      //   setError(null);
      // }

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          `${server}/api/users/profile`,
          // "http://localhost:5000/api/users/profile",
          requestOptions
        );
        const result = await response.json();
        console.log("profile result", result);
        setUser(result);
        // Need to add the below when adding proteced routes to give time to get user
        // setIsLogged(true);
      } catch (error) {
        // Need to add the below when adding proteced routes to give time to get user
        // setIsLogged(true);
        console.log("Error getting user profile", error);
      }
    } else {
      console.log("You need to log in");
    }
  };

  useEffect(() => {
    console.log("useEffect getProfile run>>>");
    getProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signUp,
        newUser,
        setNewUser,
        login,
        user,
        setUser,
        logout,
        getProfile,
        server,
        // Need to add the below when adding proteced routes to give time to get user
        // isLogged,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
