import style from "./PYQ02PRINTER.module.css";

function PYQ02PRINTER({ value, chapter, set }) {
  const subject = ["physics", "chemistry", "mathematics"];
  return (
    <div
      className={`${style.subject_card} ${style[value]} `}
      onClick={(event) => set(["second", value])}
    >
      <div>
        <h2 className={style.subject_title}>{value}</h2>
        <div className={style.subject_icon}>
          <img
            src={`https://cdn-assets.getmarks.app/app_assets/img/cpyqb/subjects/ic_${
              subject[chapter % subject.length]
            }_icon_with_illustration.svg`}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default PYQ02PRINTER;
