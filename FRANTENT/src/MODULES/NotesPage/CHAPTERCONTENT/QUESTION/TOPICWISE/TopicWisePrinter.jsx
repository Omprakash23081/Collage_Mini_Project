import style from "./TopicWisePrinter.module.css";
function TopicWisePrinter({ topics }) {
  if (!topics || typeof topics !== "object") {
    return <div>No topics available.</div>;
  }
  let i = 1;
  return (
    <>
      {Object.values(topics).map((key, idx) => (
        <div className={style.question_item} key={idx}>
          <div className={style.question_text}>
            <span>
              0{i++} {key.topic}
            </span>
          </div>
          <div className={style.question_meta}>
            Total Questions: {key.TotalQS}
          </div>
        </div>
      ))}
    </>
  );
}
export default TopicWisePrinter;
