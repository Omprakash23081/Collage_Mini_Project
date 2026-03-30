import style from "./MANUE.module.css";
import { useState, useRef } from "react";

function PYQ03MANUE() {
  const [currentquestion, setcurrentquestion] = useState("");
  const [currentfilter, setcurrentfilter] = useState("All");

  function set1(value) {
    // count.current += 1;
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
      <div className={style.categories}>
        <div
          className={`${style.category_card} ${
            currentquestion === "Beginner" && style.actives
          } `}
          onClick={() => set1("Beginner")}
        >
          <div className={style.category_title}>Beginner</div>
          <div className={style.category_icon}>
            <img
              src="https://web.getmarks.app/_next/image?url=https%3A%2F%2Fcdn-assets.getmarks.app%2Fapp_assets%2Fimg%2Fpyq_buckets%2Fic_bucket_beginner.png&w=48&q=75"
              alt=""
            />
          </div>
        </div>
        <div
          className={`${style.category_card} ${
            currentquestion === "Advance Climb" && style.actives
          } `}
          onClick={() => set1("Advance Climb")}
        >
          <div className={style.category_title}>Advance </div>
          <div className={style.category_icon}>
            <img
              src="https://web.getmarks.app/_next/image?url=https%3A%2F%2Fcdn-assets.getmarks.app%2Fapp_assets%2Fimg%2Fpyq_buckets%2Fic_bucket_advance_climb.png&w=48&q=75"
              alt=""
            />
          </div>
        </div>
      </div>

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
          All
        </button>
        <button
          className={`${style.filter_btn} ${
            currentfilter === "important" && style.active
          }`}
          onClick={(event) => set2("important")}
        >
          important
        </button>
        <button
          className={`${style.filter_btn} ${
            currentfilter === "Most important" && style.active
          }`}
          onClick={(event) => set2("Most important")}
        >
          Most important
        </button>
        <button
          className={`${style.filter_btn} ${
            currentfilter === "Attempted" && style.active
          }`}
          onClick={(event) => set2("Attempted")}
        >
          Attempted
        </button>
        <button
          className={`${style.filter_btn} ${
            currentfilter === "Not Attempted" && style.active
          }`}
          onClick={(event) => set2("Not Attempted")}
        >
          Not Attempted
        </button>
      </div>
    </>
  );
}
export default PYQ03MANUE;
