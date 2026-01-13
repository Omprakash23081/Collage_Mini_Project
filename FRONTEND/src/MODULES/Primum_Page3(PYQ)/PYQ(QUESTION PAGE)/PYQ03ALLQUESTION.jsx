import { useContext } from "react";
import { DataContext } from "../../../context/DataContext.jsx";
import style from "./PYQ03ALLQUESTION.module.css";

function PYQ03ALLQUESTION({ currentFilter, currentsubject }) {
  const { pyq: questions } = useContext(DataContext);

  const subject = currentsubject?.toLowerCase();
  const filter = currentFilter?.toLowerCase();

  const examTypeMap = {
    "st-1": "st-1",
    "st-2": "st-2",
    put: "put",
    "aktu exam": "aktu exam",
  };

  const list = Array.isArray(questions)
    ? questions
    : Object.values(questions || {});

  const filteredQuestions = list.filter((q) => {
    if (!filter || !examTypeMap[filter]) return false;

    return (
      q.examType?.toLowerCase() === examTypeMap[filter] &&
      q.subjectName?.toLowerCase() === subject?.toLowerCase() &&
      q.isAll === true
    );
  });

  if (!filteredQuestions.length) {
    return <div>No questions available.</div>;
  }

  return (
    <div className={style.questions}>
      {filteredQuestions.map((q, index) => (
        <a
          href={q.fileUrl}
          key={q._id}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={style.question_item}>
            <div className={style.question_text}>
              <span>
                {String(index + 1).padStart(2, "0")}{" "}
                {q?.teacherName?.toUpperCase()}
              </span>
            </div>
            <div className={style.question_meta}>{q?.year}</div>
          </div>
          <hr className={style.hr} />
        </a>
      ))}
    </div>
  );
}

export default PYQ03ALLQUESTION;
