import { createContext, useEffect, useState } from "react";
import getToken from "../utils/getToken.js";
import { server } from "../utils/server.js";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // User state created here to set the user after login and then export value use in components
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // REGISTER/SIGNUP
  const [newUser, setNewUser] = useState(null);

  const signUp = async (userName, email, password, avatarPicture) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("userName", userName);
    urlencoded.append("email", email);
    urlencoded.append("password", password);
    urlencoded.append(
      "avatarPicture",
      "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
    );

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    const response = await fetch(
      `${server}/api/users/signup`,
      // "http://localhost:5000/api/users/signup",
      requestOptions
    );
    if (!response.ok) {
      // New is a constructor that calls the Error class to create new instance
      // Throw creates an exception (function ends executing, ends with an error and then we can cath this outside the function in the front end with a catch
      throw new Error("Signup failed");
    }
    const result = await response.json();
    if (response.ok) {
      return result;
    }
  };

  //LOGIN
  const login = async (email, password) => {
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
    const response = await fetch(
      `${server}/api/users/login`,
      // "http://localhost:5000/api/users/login",
      requestOptions
    );
    if (!response.ok) {
      throw new Error("login failed");
    }
    const result = await response.json();
    const { token } = result;
    // set user
    if (token) {
      localStorage.setItem("token", token);
      setUser(result.user);
    }
  };

  //LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    console.log("user logged out");
  };

  // GET PROFILE
  const getProfile = async () => {
    const token = getToken();

    if (token) {
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
        setUser(result);
      } catch (error) {
        console.log("Error getting user profile", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("You need to log in");
    }
  };

  useEffect(() => {
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
        isLoading,
        // server,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
