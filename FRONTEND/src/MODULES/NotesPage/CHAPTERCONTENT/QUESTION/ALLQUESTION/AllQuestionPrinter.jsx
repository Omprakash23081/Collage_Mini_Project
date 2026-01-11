import style from "./AllQuestionPrinter.module.css";
function AllQuestionPrinter({ questions }) {
  let i = 1;
  return (
    <>
      {questions.map((values) => (
        <>
          <a href={values.fileUrl}>
            <div className={style.question_item} key={values}>
              <div className={style.question_text}>
                <span>
                  0{i++} <span style={{color: '#ffffff', margin: '0 8px'}}>{values.teacherName}</span> {values.description}
                </span>{" "}
              </div>
              <div className={style.question_meta}>
                YEAR: {values.createdAt.substring(0, 4)}
              </div>
            </div>
          </a>

          <hr className={style.hr} />
        </>
      ))}
    </>
  );
}
export default AllQuestionPrinter;
