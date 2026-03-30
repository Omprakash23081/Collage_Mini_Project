import style from "./TopicWisePYQ.module.css";
import { useData } from "../../../context/GlobalContext.jsx";

function TopicWisePYQ({ currentsubject }) {
  const { pyq: questions } = useData();

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
    return (
      <div className={style.emptyState}>
        <div className={style.emptyIcon}>
          <i className="bi bi-journal-x"></i>
        </div>
        <h3>No Topics Found</h3>
        <p>There are no chapter-wise topics available for {subject?.toUpperCase() || "this subject"} yet. Check back later.</p>
      </div>
    );
  }

  return (
    <div className={style.questions}>
      {questionList.map((q, index) => (
        <a
          key={q._id}
          href={q.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={style.question_link}
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
