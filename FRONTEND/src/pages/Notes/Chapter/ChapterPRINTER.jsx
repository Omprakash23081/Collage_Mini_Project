import style from "./ChapterPRINTER.module.css";

import { useNavigate } from "react-router-dom";

function Printer({ icons, value }) {
  const navigate = useNavigate();

  return (
    <div
      className={style.chapter_card}
      onClick={() => navigate("/primum/notes")}
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
