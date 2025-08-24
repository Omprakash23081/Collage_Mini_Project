import style from "./SubjectPRINTER.module.css";

function PYQ02PRINTER({ value, chapter, set }) {
  return (
    <div
      className={`${style.subject_card} ${style[value]} `}
      onClick={() => set(["AllQuestions", value])}
    >
      <div>
        <h2 className={style.subject_title}>{value}</h2>
        <div className={style.subject_stats}>{chapter}</div>
        <div className={style.subject_icon}>
          <img
            src={`https://cdn-assets.getmarks.app/app_assets/img/cpyqb/subjects/ic_${value}_icon_with_illustration.svg`}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default PYQ02PRINTER;
