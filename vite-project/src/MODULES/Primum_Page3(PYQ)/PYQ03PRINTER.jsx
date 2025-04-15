import style from "./PYQ03PRINTER.module.css";
function PYQPRINTER({ questions, who, set1 }) {
  function pyqrender(value) {
    set1(value);
  }

  let i = 1;
  return (
    <>
      {Object.values(questions).map((key, values) => (
        <>
          {who === "Topic" && (
            <>
              {key.topic === "important" && (
                <>
                  <div className={style.question_item} key={values}>
                    <div className={style.question_text}>
                      <span>
                        0{i++} {key.question}
                      </span>{" "}
                    </div>
                    <div className={style.question_meta}>
                      {key.year.join(", ")}
                    </div>
                  </div>
                  <hr className={style.hr} />
                </>
              )}
            </>
          )}
          {who === "PYQ03SUBTOPICWISE" && (
            <>
              <div
                className={style.question_item_topic}
                key={values}
                onClick={() => pyqrender(["TopicWise", key.topic])}
              >
                <div className={style.question_text}>
                  <span>
                    0{i++} {key.topic}
                  </span>{" "}
                </div>
                <div className={style.question_meta}>
                  {key.TotalQS} Questions
                </div>
              </div>
              <hr className={style.hr} />
            </>
          )}

          {who === "All" && (
            <>
              <div className={style.question_item} key={values}>
                <div className={style.question_text}>
                  <span>
                    0{i++} {key.question}
                  </span>{" "}
                </div>
                <div className={style.question_meta}>{key.year.join(", ")}</div>
              </div>
              <hr className={style.hr} />
            </>
          )}
        </>
      ))}
    </>
  );
}
export default PYQPRINTER;
