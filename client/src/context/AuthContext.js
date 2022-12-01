//1 Import Hook

import { createContext, useState } from "react";

//2 Create Context/Store

export const AuthContext = createContext();

//3 Create provider

export const AuthContextProvider = ({ children }) => {
  // const [user, setUser] = useState({});
  const [newUser, setNewUser] = useState({});

  return (
    <AuthContext.Provider value={{ newUser, setNewUser }}>
      {children}
    </AuthContext.Provider>
  );
};

//4 Move state and function
