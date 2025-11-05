import style from "./PYQ03SUBTOPICWISE.module.css";
import { useContext } from "react";
import { DataContext } from "../../../context/DataContext.jsx";

function PYQ03SUBTOPICWISE({ handleMenuChange }) {
  const { pyq } = useContext(DataContext);

  // Extract unique topics with their question counts
  let topicCountArr = Object.entries(
    pyq.reduce((acc, { subjectName }) => {
      acc[subjectName] = (acc[subjectName] || 0) + 1;
      return acc;
    }, {})
  ).map(([subjectName, count]) => ({ subjectName, count }));

  topicCountArr = topicCountArr.length > 0 ? topicCountArr : [];

  let i = 1;

  return (
    <>
      {topicCountArr.map((t) => (
        <>
          <div
            className={style.question_item_topic}
            key={t?._id}
            onClick={() => handleMenuChange(["Topic", t?.subjectName])}
          >
            <div className={style.question_text}>
              <span>
                0{i++} {t?.subjectName}
              </span>
            </div>
            <div className={style.question_meta}>{t?.count} Questions</div>
          </div>
          <hr className={style.hr} />
        </>
      ))}
    </>
  );
}

export default PYQ03SUBTOPICWISE;
