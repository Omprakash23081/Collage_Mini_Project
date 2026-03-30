import { createContext, useContext, useState, useEffect } from "react";
import { notesService } from "../services/notesService.js";
import { pyqService } from "../services/pyqService.js";
import { AuthContext } from "./AuthContext.jsx";

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  // --- UI & Menu State (from AppContext) ---
  const [currentPrimum, setPrimum] = useState(false);
  const [currentmanu, setManu] = useState("Home");
  const [lostManue, setlostManue] = useState("post");

  // --- Theme State (from ThemeContext) ---
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    // Default to dark unless explicitly saved as light
    const shouldBeLight = saved === "light";
    setIsDark(!shouldBeLight);
    
    if (shouldBeLight) {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newIsDark = !prev;
      localStorage.setItem("theme", newIsDark ? "dark" : "light");
      if (!newIsDark) {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
      }
      return newIsDark;
    });
  };

  // --- Academic Data (from DataContext) ---
  const [notes, setNotes] = useState([]);
  const [pyq, setPyq] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [dataError, setDataError] = useState(null);
  
  const Subject = {
    year1: ["M-I", "PHY", "CHEM", "EE", "ME", "PPS", "M-II", "BEE", "EVS", "SOFT", "ENG"],
    year2: ["DS", "COA", "DSTL", "TC", "UHV", "OS", "TAFL", "JAVA", "PY"],
    year3: ["DAA", "CN", "AI", "OOSD", "COI", "DBMS", "ML", "CD", "WT", "CC", "PE-II"],
    year4: ["PE-III", "OE-II", "HS", "INT", "PROJ", "SEMINAR", "OE-III"],
  };

  useEffect(() => {
    if (!user) return;
    const controller = new AbortController();

    const fetchDashboardData = async () => {
      setDataLoading(true);
      setDataError(null);
      try {
        const [notesRes, pyqRes] = await Promise.all([
          notesService.getAll({ signal: controller.signal }),
          pyqService.getAll({ signal: controller.signal }),
        ]);

        setNotes(notesRes?.data ?? []);
        setPyq(pyqRes?.data ?? []);
      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error("Global Data fetch error:", err);
          setDataError(err?.response?.data?.message || "Failed to load dashboard data");
        }
      } finally {
        setDataLoading(false);
      }
    };
    fetchDashboardData();

    return () => controller.abort();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        // UI
        currentPrimum, setPrimum,
        currentmanu, setManu,
        lostManue, setlostManue,
        // Theme
        isDark, toggleTheme,
        // Data
        notes, pyq, Subject, dataLoading, dataError
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hooks for easy access
export const useGlobal = () => useContext(GlobalContext);
export const useTheme = () => {
  const { isDark, toggleTheme } = useGlobal();
  return { isDark, toggleTheme };
};
export const useData = () => {
  const { notes, pyq, Subject, dataLoading, dataError } = useGlobal();
  return { notes, pyq, Subject, dataLoading, dataError };
};
export const useApp = () => {
  const { currentPrimum, setPrimum, currentmanu, setManu, lostManue, setlostManue } = useGlobal();
  return { currentPrimum, setPrimum, currentmanu, setManu, lostManue, setlostManue };
};
