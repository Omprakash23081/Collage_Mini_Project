import style from "./PYQ03MANUE.module.css";
import { useState, useRef } from "react";

function PYQ03MANUE({ currentfilter, setcurrentfilter }) {
  const [currentquestion, setcurrentquestion] = useState("");

  function set1(value) {
    if (currentquestion === value) {
      setcurrentquestion("");
    } else {
      setcurrentquestion(value);
    }
  }

  function set2(value) {
    if (currentfilter === value) {
      setcurrentfilter("All");
    } else {
      setcurrentfilter(value);
    }
  }

  return (
    <>
      <div className={style.filters}>
        <button className={style.filter_btn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#FFFFFF"
          >
            <path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z" />
          </svg>
          Filter
        </button>
        <button
          className={`${style.filter_btn} ${
            currentfilter === "All" && style.active
          }`}
          onClick={(event) => set2("All")}
        >
          ST-1
        </button>
        <button
          className={`${style.filter_btn} ${
            currentfilter === "important" && style.active
          }`}
          onClick={(event) => set2("important")}
        >
          ST-2
        </button>
        <button
          className={`${style.filter_btn} ${
            currentfilter === "Most important" && style.active
          }`}
          onClick={(event) => set2("Most important")}
        >
          PUT
        </button>
        <button
          className={`${style.filter_btn} ${
            currentfilter === "Attempted" && style.active
          }`}
          onClick={(event) => set2("Attempted")}
        >
          AKTU EXAM
        </button>
      </div>
    </>
  );
}
export default PYQ03MANUE;
