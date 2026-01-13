import style from "./PYQ03.module.css";
import PYQ03ALLQUESTION from "./PYQ03ALLQUESTION.jsx";
import PYQ03MANUE from "./PYQ03MANUE.jsx";
import PYQ03HEADERS from "./PYQ03HEADER.jsx";
import { useState, useRef, useEffect } from "react";
import TopicwisePrinter from "./TopicWisePYQ.jsx";

function PYQ03({ setcontents, currentsubject }) {
  const chepter = [
    "Chepter 1",
    "Chepter 2",
    "Chepter 3",
    "Chepter 4",
    "Chepter 5",
  ];

  const [showMenu, setShowMenu] = useState("All");
  const [currentfilter, setcurrentfilter] = useState("st-1");
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        navbarRef.current.classList.toggle(
          style.sticky,
          window.scrollY > navbarRef.current.offsetTop
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={style.body}>
      <PYQ03HEADERS set={setcontents} currentsubject={currentsubject} />

      <nav className={style.tabs} ref={navbarRef}>
        <div
          className={`${style.tab} ${showMenu === "All" ? style.active : ""}`}
          onClick={() => setShowMenu("All")}
        >
          <center>All Questions (PYQ)</center>
        </div>

        <div
          className={`${style.tab} ${
            showMenu === "TopicWise" ? style.active : ""
          }`}
          onClick={() => setShowMenu("TopicWise")}
        >
          <center>Chapater-Wise (PYQ)</center>
        </div>
      </nav>

      {showMenu === "All" && (
        <PYQ03MANUE
          currentfilter={currentfilter}
          setcurrentfilter={setcurrentfilter}
        />
      )}

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
