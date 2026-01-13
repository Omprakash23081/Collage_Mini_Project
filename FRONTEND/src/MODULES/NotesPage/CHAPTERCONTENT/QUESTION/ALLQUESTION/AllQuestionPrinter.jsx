import style from "./AllQuestionPrinter.module.css";
import { DataContext } from "../../../../../context/DataContext.jsx";
import { useContext } from "react";

function AllQuestionPrinter({ currentsubject }) {
  const { notes } = useContext(DataContext);

  let questions = Array.isArray(notes) ? notes : [];

  questions = Object.values(notes || {}).filter(
    (q) =>
      q.isFull === true &&
      q.subjectName?.toLowerCase() === currentsubject?.toLowerCase() &&
      q.status === "approved"
  );

  return (
    <>
      {questions.map((values, index) => {
        return (
          <div key={values._id || index}>
            <a
              href={values?.fileUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={style.question_item}>
                <div className={style.question_text}>
                  <span>
                    {String(index + 1).padStart(2, "0")}
                    <span style={{ color: "#ffffff", margin: "0 8px" }}>
                      {values?.teacherName || "Unknown"}
                    </span>
                  </span>
                </div>

                <div className={style.question_meta}>
                  YEAR: {values?.year || "N/A"}
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
