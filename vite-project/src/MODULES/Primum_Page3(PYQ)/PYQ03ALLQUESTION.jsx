import style from "./PYQ03ALLQUESTION.module.css";
import { useState, useEffect } from "react";
import PYQ03MANUE from "./PYQ03MANUE.jsx";
import Printer from "./PYQ03PRINTER.jsx";

function PYQ03ALLQUESTION({ questions }) {
  return (
    <>
      <PYQ03MANUE />
      <div className={style.questions}>
        <Printer questions={questions} who={"All"} />
      </div>
    </>
  );
}
export default PYQ03ALLQUESTION;
