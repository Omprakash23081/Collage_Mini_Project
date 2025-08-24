import Printer from "./ChapterPRINTER";
import style from "./Chapter.module.css";

function Chapter({ icons, SubjectName, setcontents, currentsubject }) {
  function set(value) {
    setcontents(value);
  }
  let i = 0;
  return (
    <>
      <div className={style.pyq} id={style.body}>
        <div
          className={style.chapter_icon}
          id={style.back_icon}
          onClick={() => setcontents(["Subject"])}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#0000F5"
          >
            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
          </svg>
        </div>

        <div className={style.pyq_container}>
          <header>
            <div className={style.subject_header}>
              <div className={style.subject_name}>
                <div className={style.subject_icon}>📚</div>
                <div className={style.subject_info}>
                  <h1>{currentsubject}</h1>
                </div>
              </div>
              <div className={style.SubjectDetails}>
                <p className={style.Chapter}>32 Chapters, 5292 Qs</p>
                <p>Filter chapters as per latest syllabus</p>
              </div>
            </div>

            <div className={style.AllSyllabes}>
              <button className={style.syllabes}>As per syllabus</button>
              <button>Easy Chapter</button>
            </div>
          </header>
          <div className={style.chapters_grid}>
            {SubjectName.length > 0 ? (
              SubjectName.map((value, index) => (
                <Printer
                  value={value}
                  key={index}
                  icons={icons[i++]}
                  set={set}
                />
              ))
            ) : (
              <p>No subjects available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Chapter;
