import style from "./AllQuestionPrinter.module.css";
import { useData } from "../../../../../context/GlobalContext.jsx";

function AllQuestionPrinter({ currentsubject }) {
  const { notes } = useData();

  let questions = Array.isArray(notes) ? notes : [];

  questions = Object.values(notes || {}).filter(
    (q) =>
      q.isFull === true &&
      q.subjectName?.toLowerCase() === currentsubject?.toLowerCase() &&
      q.status === "approved"
  );

  if (!questions.length) {
    return (
      <div className={style.emptyState}>
        <div className={style.emptyIcon}>
          <i className="bi bi-journal-x"></i>
        </div>
        <h3>No Notes Found</h3>
        <p>We couldn't find any complete notes for this section yet. Check back later.</p>
      </div>
    );
  }

  return (
    <>
      {questions.map((values, index) => {
        return (
          <div key={values._id || index}>
            <a
              href={values?.fileUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={style.question_link}
            >
              <div className={style.question_item}>
                <div className={style.question_text}>
                  <span>
                    {String(index + 1).padStart(2, "0")}{" "}
                    {values?.teacherName?.toUpperCase() || "UNKNOWN"}
                  </span>
                </div>

                <div className={style.question_meta}>
                  {values?.year || "N/A"}
                </div>
              </div>
            </a>

            <hr className={style.hr} />
          </div>
        );
      })}
    </>
  );
}

export default AllQuestionPrinter;
