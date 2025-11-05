import style from "./PYQ03TOPICKWISE.module.css";
import { useContext } from "react";
import { DataContext } from "../../../context/DataContext.jsx";

function PYQ03TOPICKWISE({ selectedTopic }) {
  const { pyq } = useContext(DataContext);

  const filteredData = pyq.filter((obj) => obj.subjectName === selectedTopic);

  console.log(filteredData, "filtered data for topick", selectedTopic);

  let i = 1;
  return (
    <>
      {filteredData?.map((q) => (
        <>
          <div className={style.question_item} key={q._id}>
            <div className={style.question_text}>
              <span>
                0{i++} {q.question}
              </span>
            </div>
            <div className={style.question_meta}>{q.years?.join(", ")}</div>
          </div>
          <hr className={style.hr} />
        </>
      ))}
    </>
  );
}

export default PYQ03TOPICKWISE;
