import style from "./TopicWisePrinter.module.css";
function TopicWisePrinter({ questions: topics }) {
  if (!topics || typeof topics !== "object") {
    return <div>No topics available.</div>;
  }
  let i = 1;
  return (
    <>
      {topics.map((values) => (
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
export default TopicWisePrinter;
