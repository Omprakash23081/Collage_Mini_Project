import style from "./ChapterPRINTER.module.css";

function Printer({ icons, value, set }) {
  function setquestions(value) {
    set(value);
  }

  return (
    <div
      className={style.chapter_card}
      onClick={() => setquestions(["AllQuestions", value])}
    >
      <div className={style.chapter_icon}>{icons}</div>
      <div className={style.chapter_info}>
        <h3>{value}</h3>
        <p>116 Qs</p>
      </div>
    </div>
  );
}
export default Printer;
