import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  return (
    <AppContext.Provider
      value={{
        isLogin,
        setIsLogin,
        loading,
        setLoading,
        userName,
        setUserName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
