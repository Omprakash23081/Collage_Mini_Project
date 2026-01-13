import style from "./Question.module.css";
import AllPrinter from "./ALLQUESTION/AllQuestionPrinter.jsx";
import TopicwisePrinter from "./TOPICWISE/ChepterNamePrinter.jsx";
import { useState, useRef, useEffect, useContext } from "react";

function Notes({ setcontents, currentsubject }) {
  const [activeTab, setActiveTab] = useState("All");
  const [isSticky, setIsSticky] = useState(false);

  const navbarRef = useRef(null);
  const navbarTop = useRef(0); // ✅ store initial position

  useEffect(() => {
    if (!navbarRef.current) return;

    navbarTop.current = navbarRef.current.offsetTop;

    const handleScroll = () => {
      const shouldStick = window.scrollY >= navbarTop.current;
      setIsSticky((prev) => (prev !== shouldStick ? shouldStick : prev));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={style.body}>
      <nav
        ref={navbarRef}
        className={`${style.tabs} ${isSticky ? style.sticky : ""}`}
      >
        <div
          className={`${style.tab} ${activeTab === "All" ? style.active : ""}`}
          onClick={() => setActiveTab("All")}
        >
          <center>All Chepter (Notes)</center>
        </div>

        <div
          className={`${style.tab} ${
            activeTab === "TopicWise" ? style.active : ""
          }`}
          onClick={() => setActiveTab("TopicWise")}
        >
          <center>Chepter wise (Notes)</center>
        </div>

        <hr className={style.hr} />
      </nav>

      <div className={style.questions_contener}>
        {activeTab === "TopicWise" ? (
          <TopicwisePrinter currentsubject={currentsubject} />
        ) : (
          <AllPrinter currentsubject={currentsubject} />
        )}
      </div>
    </div>
  );
}

export default Notes;
