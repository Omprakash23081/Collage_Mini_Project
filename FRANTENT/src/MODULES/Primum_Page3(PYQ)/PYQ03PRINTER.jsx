import style from "./PYQ03PRINTER.module.css";
function PYQPRINTER({ questions, who, handleMenuChange }) {
  function pyqrender(value) {
    handleMenuChange(value);
  }
  // console.log("Questions:", questions);

  let i = 1;
  return (
    <>
      {Object.values(questions).map((key, values) => (
        <>
          {/* //this is for sub topick wise when i click on paticiluar topic */}
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
          {/* //tthis is for sub topic wise when i click on sub topic nav bar */}
          {who === "PYQ03SUBTOPICWISE" && (
            <>
              <div
                className={style.question_item_topic}
                key={values}
                onClick={() => pyqrender(["Topic", key.topic])}
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
          {/* //this is for all question when i click on all question nav bar */}
          {who === "All" && (
            <>
              <div
                className={style.question_item}
                key={values}
                onClick={() =>
                  pyqrender(["", "Q" + key.q + "  " + key.question])
                }
              >
                <div className={style.question_text}>
                  <span>
                    0{key.q} {key.question}
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
