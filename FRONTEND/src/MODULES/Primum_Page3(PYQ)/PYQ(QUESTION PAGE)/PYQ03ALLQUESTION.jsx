import { useState, useContext } from "react";
import { DataContext } from "../../../context/DataContext.jsx";
import style from "./PYQ03ALLQUESTION.module.css";
import PYQ03MANUE from "./PYQ03MANUE.jsx";

function PYQ03ALLQUESTION({ handleMenuChange }) {
  const [currentFilter, setCurrentFilter] = useState("All");
  const { pyq: questions } = useContext(DataContext);

  const questionList = Object.values(questions || {});

  const filteredQuestions = questionList.filter((obj) => {
    switch (currentFilter.toLowerCase()) {
      case "important":
        return obj.tag?.toLowerCase() === "important";
      case "most important":
        return obj.tag?.toLowerCase() === "most important";
      default:
        return true;
    }
  });

  return (
    <>
      <PYQ03MANUE
        currentfilter={currentFilter}
        setcurrentfilter={setCurrentFilter}
      />
      <div className={style.questions}>
        {filteredQuestions.map((q) => (
          <>
            <div
              className={style.question_item}
              key={q._id}
              onClick={() => handleMenuChange(["", `${q._id}`])}
            >
              <div className={style.question_text}>
                <span>
                  0{q.questionNumber} {q.question}
                </span>
              </div>
              <div className={style.question_meta}>{q.years?.join(", ")}</div>
            </div>
            <hr className={style.hr} />
          </>
        ))}
      </div>
    </>
  );
}

export default PYQ03ALLQUESTION;
