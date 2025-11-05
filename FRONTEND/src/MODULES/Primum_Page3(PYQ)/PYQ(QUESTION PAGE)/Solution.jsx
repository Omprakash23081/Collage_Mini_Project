import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../context/DataContext.jsx";
import { pyqService } from "../../../services/pyqService.js";
import style from "./Solution.module.css";

function Solution({ id, handleMenuChange }) {
  const { pyq } = useContext(DataContext);
  console.log(pyq);
  let response = pyq.find((obj) => obj._id === id);

  return (
    <>
      <div className={style.contaner}>
        <div className={style.questionName}>
          <h1>
            <b>Question</b> : {response.question}
          </h1>
        </div>
        <div className={style.subjectName}>
          <h2>
            <b>Subject:</b> {"   "} {response.subjectName}
          </h2>
        </div>
        <div
          className={style.chapter_icon}
          id={style.back_icon}
          onClick={() => handleMenuChange(["All"])}
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
        <div className={style.Solution}>
          <div className={style.SolutionName}>
            <h1>Solution</h1>
          </div>
          <div className={style.solutionContent}> op</div>
        </div>
      </div>
    </>
  );
}
export default Solution;
