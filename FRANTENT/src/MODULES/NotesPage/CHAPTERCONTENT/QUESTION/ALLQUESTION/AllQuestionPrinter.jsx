import style from "./AllQuestionPrinter.module.css";
function AllQuestionPrinter({ questions }) {
  let i = 1;
  return (
    <>
      {Object.values(questions).map((key, values) => (
        <>
          <div className={style.question_item} key={values}>
            <div className={style.question_text}>
              <span>
                0{i++} {key.chapter}
              </span>{" "}
            </div>
            <div className={style.question_meta}>
              Total Questions: {key.TotalQS}
            </div>
          </div>
          <hr className={style.hr} />
        </>
      ))}
    </>
  );
}
export default AllQuestionPrinter;
