import style from "./PYQ01PRINTER.module.css";

function Printer({ icons, value, set }) {
  function setquestions(value) {
    set(value)
  }

  return (
    <div className={style.chapter_card} onClick={(event) => setquestions(["third", value])}>
      <div className={style.chapter_icon}>{icons}</div>
      <div className={style.chapter_info}>
        <h3>{value}</h3>
        <p>116 Qs</p>
      </div>
    </div>
  )
}
export default Printer;