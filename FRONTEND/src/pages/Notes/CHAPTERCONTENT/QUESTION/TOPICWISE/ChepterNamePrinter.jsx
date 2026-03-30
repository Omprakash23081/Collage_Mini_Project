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

  return (
    <div className={style.questions}>
      {questionList.map((q, index) => (
        <a
          href={q.fileUrl}
          key={q._id}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={style.question_item}>
            <div className={style.question_text}>
              <span>
                {index + 1}. {q.chapter} {q.chapterName?.toUpperCase()}
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

export default TopicWisePrinter;
