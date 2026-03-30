import style from "./PYQ03.module.css";
import PYQ03ALLQUESTION from "./PYQ03ALLQUESTION.jsx";
import PYQ03MANUE from "./PYQ03MANUE.jsx";
import PYQ03HEADERS from "./PYQ03HEADER.jsx";
import { useState, useRef, useEffect } from "react";
import TopicwisePrinter from "./TopicWisePYQ.jsx";

function PYQ03({ currentsubject }) {
  const chapter = [
    "Chapter 1",
    "Chapter 2",
    "Chapter 3",
    "Chapter 4",
    "Chapter 5",
  ];

  const [showMenu, setShowMenu] = useState("All");
  const [currentfilter, setcurrentfilter] = useState("st-1");
  const navbarRef = useRef(null);

  return (
    <div className={style.body}>
      <PYQ03HEADERS currentsubject={currentsubject} />

      <div className={style.sticky_header}>
        <nav className={style.tabs}>
          <div
            className={`${style.tab} ${showMenu === "All" ? style.active : ""}`}
            onClick={() => setShowMenu("All")}
          >
            All Questions (PYQ)
          </div>

          <div
            className={`${style.tab} ${
              showMenu === "TopicWise" ? style.active : ""
            }`}
            onClick={() => setShowMenu("TopicWise")}
          >
            Chapter-Wise (PYQ)
          </div>
        </nav>

        {showMenu === "All" && (
          <div className={style.filters_wrapper}>
            <PYQ03MANUE
              currentfilter={currentfilter}
              setcurrentfilter={setcurrentfilter}
            />
          </div>
        )}
      </div>

      <div className={style.questions_contener}>
        {showMenu === "All" && (
          <PYQ03ALLQUESTION
            currentFilter={currentfilter}
            currentsubject={currentsubject}
          />
        )}

        {showMenu === "TopicWise" && (
          <TopicwisePrinter currentsubject={currentsubject} />
        )}
      </div>
    </div>
  );
}

export default PYQ03;
