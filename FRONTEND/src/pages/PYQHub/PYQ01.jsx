import Printer from "./PYQ01PRINTER.jsx";
import style from "./PYQ01.module.css";

function Pyq01({ icons, SubjectName, setcontents, currentsubject }) {

  function set(value) {
    setcontents(value);
  }
  let i = 0;
  return (
    <>
      <div className={style.pyq} id={style.body}>
        <div className={style.pyq_container}>
          <header>
            <div className={style.subject_header}>
              <div className={style.chapter_icon} id={style.back_icon} onClick={(event) => setcontents(["first"])}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </div>
              <div className={style.subject_name}>
                <div className={style.subject_info}>
                  <h1>{currentsubject}</h1>
                </div>
              </div>

            </div>

            <div className={style.AllSyllabes}>
              <button className={style.syllabes}>Chapter wise</button>
              <button>All</button>
            </div>
          </header>
          <div className={style.chapters_grid} >
            {SubjectName.length > 0 ? (
              SubjectName.map((value, index) => (
                <Printer value={value} key={index} icons={icons[i++]} set={set} />
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

export default Pyq01;
