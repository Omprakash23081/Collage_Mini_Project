import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [AccessToken, setAccessToken] = useState(null);

  return (
    <AppContext.Provider
      value={{
        isLogin,
        setIsLogin,
        loading,
        setLoading,
        AccessToken,
        setAccessToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
