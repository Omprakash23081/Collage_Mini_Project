import style from "./PYQ02.module.css";
import { useContext } from "react";
import { useState } from "react";
import PYQ02PRINTER from "./PYQ02PRINTER.jsx";
import { useData } from "../../context/GlobalContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";

function PYQ02() {
  const { Subject } = useData();
  const { user } = useContext(AuthContext);

  let data = [];
  if (user) {
    for (let key in Subject) {
      if (key === user?.year) data = Subject[key];
    }
  }

  // Helper to convert year strings to semester format
  const getSemesterString = (yearStr) => {
    if (!yearStr) return "";
    const y = yearStr.toLowerCase();
    if (y.includes("1")) return "1st & 2nd Sem";
    if (y.includes("2")) return "3rd & 4th Sem";
    if (y.includes("3")) return "5th & 6th Sem";
    if (y.includes("4")) return "7th & 8th Sem";
    return yearStr.toUpperCase();
  };

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
            <b> {getSemesterString(user?.year)}</b>
          </span>
          {"    "}
           PYQ
        </div>
      </div>

      <div className={style.subjects}>
        {data.map((value) => (
          <PYQ02PRINTER value={value} key={value} chapter={i++} />
        ))}
      </div>
    </div>
  );
}
export default PYQ02;
