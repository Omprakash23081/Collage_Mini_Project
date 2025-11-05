import style from "./PYQ02.module.css";
import { useContext } from "react";
import { useState } from "react";
import PYQ02PRINTER from "./PYQ02PRINTER.jsx";
import { DataContext } from "../../context/DataContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";

function PYQ02({ setcontents }) {
  const { Subject } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  function set(value) {
    setcontents(value);
  }

  let data = [];
  if (user) {
    for (let key in Subject) {
      if (key === user?.year) data = Subject[key];
    }
  }

  // const [selectedSubject, setSelectedSubject] = useState("");

  let i = 0;

  return (
    <div className={style.PYQ02contener} id={style.PYQ02body}>
      <header className={style.PYQ02header}>
        <h1>AKTU</h1>
      </header>

      <div className={style.status_badge}>
        <img src="https://web.getmarks.app/icons/CircleWavyCheck.svg" alt="" />
        Updated as per latest syllabus
      </div>

      <div className={style.stats}>
        <div className={style.stat_item}>
          <div className={style.stat_value}>2020 - 2025</div>
          <div className={style.stat_label}>Year</div>
        </div>
        <div className={style.stat_item}>
          <div className={style.stat_value}>{data.length}</div>
          <div className={style.stat_label}>Papers</div>
        </div>
        <div className={style.stat_item}>
          <div className={style.stat_value}>{data.length * 22}</div>
          <div className={style.stat_label}>Questions</div>
        </div>
      </div>

      <div className={style.tabs}>
        <div className={`${style.tab}`}>
          <span>
            <b> {user?.year?.toUpperCase()}</b>
          </span>
          {"    "}
          Notes
        </div>
      </div>

      <div className={style.subjects}>
        {data.map((value) => (
          <PYQ02PRINTER value={value} key={value} chapter={i++} set={set} />
        ))}
      </div>
    </div>
  );
}
export default PYQ02;
