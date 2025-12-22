import { useContext } from "react";
import { DataContext } from "../../../context/DataContext.jsx";
import style from "./PYQ03ALLQUESTION.module.css";
// import PYQ03MANUE from "./PYQ03MANUE.jsx"; // Removed internal usage
import { authService } from "../../../services/authService.js";

function PYQ03ALLQUESTION({ handleMenuChange, currentFilter }) {
  // const [currentFilter, setCurrentFilter] = useState("All"); // Removed internal state
  const { pyq: questions } = useContext(DataContext);

  const questionList = Object.values(questions || {});

  const filteredQuestions = questionList.filter((obj) => {
    switch (currentFilter.toLowerCase()) {
      case "important":
        return obj.tag?.toLowerCase() === "important";
      case "most important":
        return obj.tag?.toLowerCase() === "most important";
      case "attempted": // Added handling for other cases if necessary
             return obj.tag?.toLowerCase() === "attempted"; // Example logic if tag matches
      // Note: The original switch only handled important/most important. 
      // Ensuring it matches what PYQ03MANUE emits.
      // PYQ03MANUE emits "All", "important", "Most important", "Attempted", "Not Attempted".
      default:
        return true;
    }
  });

  return (
    <>
      <div className={style.questions}>
        {filteredQuestions.map((q) => (
          <>
            <div
              className={style.question_item}
              key={q._id}
              onClick={() => {
                  handleMenuChange(["", `${q._id}`]);
                  authService.trackActivity(q.subjectName || "General", "PYQ");
              }}
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
