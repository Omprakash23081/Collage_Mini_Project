import style from "./TopicWisePrinter.module.css";
import { useData } from "../../../../../context/GlobalContext.jsx";

function TopicWisePrinter({ currentsubject }) {
  const { notes } = useData();

  console.log(notes);
  console.log(currentsubject);

  const questionList = Object.values(notes || {}).filter(
    (q) =>
      q.isFull === false &&
      q.subjectName?.toLowerCase() === currentsubject?.toLowerCase() &&
      q.status === "approved"
  );

  console.log(questionList);

  if (!questionList.length) {
    return (
      <div className={style.emptyState}>
        <div className={style.emptyIcon}>
          <i className="bi bi-journal-x"></i>
        </div>
        <h3>No Topics Found</h3>
        <p>There are no chapter-wise topics available for {currentsubject?.toUpperCase() || "this subject"} yet. Check back later.</p>
      </div>
    );
  }

  return (
    <div className={style.questions}>
      {questionList.map((q, index) => (
        <a
          href={q.fileUrl || "#"}
          key={q._id}
          target="_blank"
          rel="noopener noreferrer"
          className={style.question_link}
        >
          <div className={style.question_item}>
            <div className={style.question_text}>
              <span>
                {String(index + 1).padStart(2, "0")}.{" "}
                {q.chapterName?.toUpperCase() || "UNKNOWN"} {q.chapter}
              </span>
            </div>
            <div className={style.question_meta}>{q?.year || "N/A"}</div>
          </div>
          <hr className={style.hr} />
        </a>
      ))}
    </div>
  );
}

export default TopicWisePrinter;
