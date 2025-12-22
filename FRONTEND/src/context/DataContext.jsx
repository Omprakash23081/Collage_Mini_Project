import { createContext, useContext, useState, useEffect } from "react";
import { notesService } from "../services/notesService.js";
import { pyqService } from "../services/pyqService.js";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  // initialize as arrays (safer if API returns list)
  const [notes, setnotes] = useState([]);
  const [pyq, setpyq] = useState([]);

  //this is running perfectely
  const Subject = {
    //for 1 and 2 semester
    year1: [
      "Mathematics-I",
      "Physics ",
      " Chemistry",
      "Electrical Engineering ",
      "Electronics Engineering",
      "Programming for Problem Solving ",
      "Mechanical Engineering",
      "Mathematics-II",
      "Mechanics",
      "Basic Electrical ",
      "Soft Skills ",
      "Environment & Ecology",
    ],
    year2: [
      // Semester III & IV combined
      "DS",
      "COA",
      "DSTL",
      "OS",
      "TAFAL",
      "Java",
      "Python Programming",
      "Syber Security",
      "Web Designing Workshop",
      "Science Based Open Elective (Maths-III/IV/V)",
      "UHV",
      "TC",
    ],
    year3: [
      // Semester V & VI – core CSE/IT
      "DBMS",
      "DAA",
      "CN",
      "AI",
    ],
    year4: [
      // Semester VII & VIII
      "HSMSC-1 / HSMSC-2 (Humanities & Social Sciences / Management Science)",
      "Departmental Elective-IV",
      "Departmental Elective-V",
      "Open Elective-II",
      "Open Elective-III",
      "Project",
      "MOOCs (for Honours Degree)",
      "Industry Internship / Major Project",
      "Seminar / Workshop",
      "Professional Elective",
    ],
  };

  useEffect(() => {
    let mounted = true; // prevent state updates after unmount

    const fetchDashboardData = async () => {
      try {
        const response = await notesService.getAll();
        if (mounted) setnotes(response?.data ?? []);
      } catch (err) {
        console.error("Error fetching notes:", err);
      }

      try {
        const pyqresponse = await pyqService.getAll();
        if (mounted) setpyq(pyqresponse?.data ?? []);
      } catch (err) {
        console.error("Error fetching pyq:", err);
      }
    };

    fetchDashboardData();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <DataContext.Provider value={{ notes, Subject, pyq }}>
      {children}
    </DataContext.Provider>
  );
};
