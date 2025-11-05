import { createContext, useContext, useState, useEffect } from "react";
import { notesService } from "../services/notesService.js";
import { pyqService } from "../services/pyqService.js";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [notes, setnotes] = useState({});
  const [pyq, setpyq] = useState({});

  //this is running perfectely
  const Subject = {
    //for 1 and 2 semester
    year1: [
      "Engineering Mathematics-I",
      "Engineering Physics ",
      " Engineering Chemistry",
      "Fundamentals of Electrical Engineering ",
      "Fundamentals of Electronics Engineering",
      "Programming for Problem Solving ",
      "Fundamentals of Mechanical Engineering",
      "Engineering Mathematics-II",
      "Engineering Mechanics",
      "Basic Electrical ",
      "Electronics Engineering Lab",
      "Programming for Problem Solving Lab",
      "Workshop Practice",
      "English Language",
      "Soft Skills ",
      "Environment & Ecology",
    ],
    year2: [
      // Semester III & IV combined
      "Data Structures",
      "Computer Organization & Architecture",
      "Discrete Structures & Theory of Logic",
      "Operating Systems",
      "Theory of Automata & Formal Languages",
      "Object Oriented Programming with Java",
      "Python Programming / Cyber Security",
      "Web Designing Workshop",
      "Science Based Open Elective (Maths-III/IV/V)",
      "Universal Human Values & Professional Ethics / Technical Communication",
    ],
    year3: [
      // Semester V & VI – core CSE/IT
      "Database Management Systems",
      "Design & Analysis of Algorithms",
      "Computer Networks",
      "Artificial Intelligence",
      "Web Technology",
      "Departmental Elective-I",
      "Departmental Elective-II",
      "Open Elective-I",
      "Labs: DBMS Lab, Web Technology Lab, AI Lab",
      "Mini Project / Internship Assessment",
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
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const response = await notesService.getAll();
    setnotes(response.data);
    console.log("fathing data", response);

    const pyqresponse = await pyqService.getAll();
    setpyq(pyqresponse.data);
  };

  return (
    <DataContext.Provider value={{ notes, Subject, pyq }}>
      {children}
    </DataContext.Provider>
  );
};
