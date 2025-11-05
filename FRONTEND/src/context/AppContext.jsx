import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentPrimum, setPrimum] = useState(false);
  const [currentmanu, setManu] = useState("Home");
  const [lostManue, setlostManue] = useState("post");

  return (
    <AppContext.Provider
      value={{
        currentPrimum,
        setPrimum,
        currentmanu,
        setManu,
        lostManue,
        setlostManue,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
