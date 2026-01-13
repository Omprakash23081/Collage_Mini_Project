import { createContext, useContext, useState, useEffect } from "react";
import { notesService } from "../services/notesService.js";
import { pyqService } from "../services/pyqService.js";
import { AuthContext } from "./AuthContext.jsx";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  // initialize as arrays (safer if API returns list)
  const [notes, setNotes] = useState([]);
  const [pyq, setPyq] = useState([]);
  const { user } = useContext(AuthContext);

  const Subject = {
    //for 1 and 2 semester
    year1: [
      // Semester I
      "M-I", // Mathematics-I
      "PHY", // Physics
      "CHEM", // Chemistry
      "EE", // Electrical Engineering
      "ME", // Mechanical Engineering
      "PPS", // Programming for Problem Solving

      // Semester II
      "M-II", // Mathematics-II
      "BEE", // Basic Electrical Engineering
      "EVS", // Environment & Ecology
      "SOFT", // Soft Skills
      "ENG", // Engineering Graphics
    ],
    year2: [
      // Semester III
      "DS", // Data Structures
      "COA", // Computer Organization & Architecture
      "DSTL", // Digital System & Logic Design
      "TC", // Technical Communication
      "UHV", // Universal Human Values

      // Semester IV
      "OS", // Operating System
      "DBMS", // Database Management System
      "TAFL", // Theory of Automata & Formal Languages
      "JAVA", // Java Programming
      "PY", // Python Programming
    ],
    year3: [
      // Semester V
      "DAA", // Design & Analysis of Algorithms
      "CN", // Computer Networks
      "AI", // Artificial Intelligence
      "SE", // Software Engineering
      "OE-I", // Open Elective-I

      // Semester VI
      "ML", // Machine Learning
      "CD", // Compiler Design
      "WT", // Web Technology
      "PE-I", // Professional Elective-I
      "PE-II", // Professional Elective-II
    ],
    year4: [
      // Semester VII
      "PE-III", // Professional Elective-III
      "OE-II", // Open Elective-II
      "HS", // Humanities / Management
      "INT", // Internship

      // Semester VIII
      "PROJ", // Major Project
      "SEMINAR", // Seminar
      "OE-III", // Open Elective-III
    ],
  };

  useEffect(() => {
    if (!user) return;
    const controller = new AbortController();

    const fetchDashboardData = async () => {
      try {
        const [notesRes, pyqRes] = await Promise.all([
          notesService.getAll({ signal: controller.signal }),
          pyqService.getAll({ signal: controller.signal }),
        ]);

        setNotes(notesRes?.data ?? []);
        setPyq(pyqRes?.data ?? []);
      } catch (err) {
        if (err.name !== "CanceledError") {
          console.error("Dashboard fetch error:", err);
        }
      }
    };
    fetchDashboardData();

    return () => {
      controller.abort();
    };
  }, [user]);

  return (
    <DataContext.Provider value={{ notes, Subject, pyq }}>
      {children}
    </DataContext.Provider>
  );
};
