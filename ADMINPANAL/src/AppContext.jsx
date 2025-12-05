import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");

  return (
    <AppContext.Provider
      value={{
        isLogin,
        setIsLogin,
        loading,
        setLoading,
        userName,
        setUserName,
        userImage,
        setUserImage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
