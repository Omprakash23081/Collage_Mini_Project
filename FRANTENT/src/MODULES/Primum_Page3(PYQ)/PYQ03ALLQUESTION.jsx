import style from "./PYQ03ALLQUESTION.module.css";
import { useState } from "react";
import PYQ03MANUE from "./PYQ03MANUE.jsx";
import Printer from "./PYQ03PRINTER.jsx";

function PYQ03ALLQUESTION({ questions, handleMenuChange }) {
  const [currentfilter, setcurrentfilter] = useState("All");
  console.log("Current Filter:", currentfilter);

  // Convert questions object to array
  const questionsArray = Object.values(questions);

  // Filtering logic based on selected filter
  const filteredQuestions = questionsArray.filter((q) => {
    switch (currentfilter.trim().toLowerCase()) {
      case "all":
        return true;
      case "important":
        return q.topic?.toLowerCase() === "important";
      case "most important":
        return q.mostImportant === true;
      case "attempted":
        return q.attempted === true;
      case "not attempted":
        return q.attempted === false;
      default:
        return true;
    }
  });
  // console.log("Filtered Questions:", filteredQuestions);

  return (
    <>
      <PYQ03MANUE
        currentfilter={currentfilter}
        setcurrentfilter={setcurrentfilter}
      />
      <div className={style.questions}>
        <Printer
          questions={filteredQuestions}
          who={"All"}
          handleMenuChange={handleMenuChange}
        />
      </div>
    </>
  );
}

export default PYQ03ALLQUESTION;
