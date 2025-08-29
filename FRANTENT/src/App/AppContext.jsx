import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [currentPrimum, setPrimum] = useState(false);
  const [currentmanu, setManu] = useState("Home");

  function handleLogin() {
    setIsLogin(true);
  }

  return (
    <AppContext.Provider
      value={{
        isLogin,
        setIsLogin,
        handleLogin,
        currentPrimum,
        setPrimum,
        currentmanu,
        setManu,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
