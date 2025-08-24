import style from "./Subject.module.css";
import SubjectPRINTER from "./SubjectPRINTER.jsx";

function Subject({ setcontents }) {
  function set(value) {
    setcontents(value);
  }

  const subject = ["physics", "chemistry", "mathematics", "History"];
  const chapter = [
    "5 Chapters, 80 Qs",
    "3 Chapters, 52 Qs",
    "7 Chapters, 528 Qs",
    "1 Chapter, 20 Qs",
  ];

  let i = 0;

  return (
    <div className={style.PYQ02contener} id={style.PYQ02body}>
      <header className={style.PYQ02header}>
        <h1>BSEB</h1>
      </header>

      <div className={style.status_badge}>
        <img src="https://web.getmarks.app/icons/CircleWavyCheck.svg" alt="" />
        Updated as per latest syllabus
      </div>

      <div className={style.stats}>
        <div className={style.stat_item}>
          <div className={style.stat_value}>2025 - 2009</div>
          <div className={style.stat_label}>Year</div>
        </div>
        <div className={style.stat_item}>
          <div className={style.stat_value}>173</div>
          <div className={style.stat_label}>Papers</div>
        </div>
        <div className={style.stat_item}>
          <div className={style.stat_value}>15825</div>
          <div className={style.stat_label}>Questions</div>
        </div>
      </div>

      <div className={style.tabs}>
        <div className={`${style.tab} ${style.active}`}>Previous Year Qs</div>
        <div className={style.tab}>NTA Abhyas</div>
      </div>

      <div className={style.subjects}>
        {subject.map((value) => (
          <SubjectPRINTER
            value={value}
            key={value}
            chapter={chapter[i++]}
            set={set}
          />
        ))}
      </div>
    </div>
  );
}
export default Subject;
