import style from "./TopicWisePYQ.module.css";
import { useContext } from "react";
import { DataContext } from "../../../context/DataContext.jsx";

function TopicWisePYQ({ currentsubject }) {
  const { pyq: questions } = useContext(DataContext);

  const subject = currentsubject?.toLowerCase();

  const list = Array.isArray(questions)
    ? questions
    : Object.values(questions || {});

  const questionList = list.filter(
    (q) =>
      q.isAll === false &&
      q.chapter != null &&
      q.subjectName?.toLowerCase() === subject
  );

  if (!questionList.length) {
    return <div>No topics available.</div>;
  }

  return (
    <div className={style.questions}>
      {questionList.map((q, index) => (
        <a
          key={q._id}
          href={q.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={style.question_item}>
            <div className={style.question_text}>
              <span>
                {String(index + 1).padStart(2, "0")}.{" "}
                {q.chapterName?.toUpperCase()} — Chapter {q.chapter}
              </span>
            </div>
            <div className={style.question_meta}>{q.year}</div>
          </div>
          <hr className={style.hr} />
        </a>
      ))}
    </div>
  );
}

export default TopicWisePYQ;
