import Pyq01 from "../PYQ01.jsx";
import Pyq02 from "../PYQ02.jsx";
import Pyq03 from "../PYQ(QUESTION PAGE)/PYQ03.jsx";
import style from "./PYQ.module.css";
import { useState } from "react";

function Pyq() {
  const [currencontent, setcontent] = useState("first");
  const [currentsubject, setsubject] = useState();
  function setcontents(value) {
    if (value[0] === "TopicWise") {
      setsubject(value[1]);
    } else {
      setcontent(value[0]);
      setsubject(value[1]);
    }
  }
  const icons = ["∫", "📏", "📈", "⚡", "🌍"];
  const SubjectName = [
    "Chapter 1",
    "Chapter 2",
    "Chapter 3",
    "Chapter 4",
    "Chapter 5",
  ];

  return (
    <div className={style.pyq}>
      {currencontent === "first" && <Pyq02 setcontents={setcontents} />}

      {currencontent === "second" && (
        <Pyq01
          icons={icons}
          SubjectName={SubjectName}
          setcontents={setcontents}
          currentsubject={currentsubject}
        />
      )}

      {currencontent === "third" && (
        <Pyq03 setcontents={setcontents} currentsubject={currentsubject} />
      )}
    </div>
  );
}
export default Pyq;
{
  /* <div onClick={() => setcontent("second")} */
}
