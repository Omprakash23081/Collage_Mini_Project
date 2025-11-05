import style from "./Question.module.css";
import AllPrinter from "../QUESTION/ALLQUESTION/AllQuestionPrinter.jsx";
import TopicwisePrinter from "../QUESTION/TOPICWISE/TopicWisePrinter.jsx";
import { useState, useRef, useEffect, useContext } from "react";
import { DataContext } from "../../../../context/DataContext.jsx";

function Question({ setcontents, currentsubject }) {
  let { notes: questions } = useContext(DataContext);
  if (questions.length > 0) {
    questions = questions?.filter(
      (obj) => obj?.subjectName?.toUpperCase() === currentsubject.toUpperCase()
    );
  } else {
    questions = [];
  }
  // const questions = {
  //   1: { chapter: "Niwtan Law", TotalQS: 26 },
  //   2: { chapter: "Faraday law", TotalQS: 16 },
  //   3: { chapter: "Absorption Law", TotalQS: 18 },
  // };

  const topics = {
    1: { topic: "Niwtan Law", TotalQS: 26 },
    2: { topic: "Faraday law", TotalQS: 16 },
    3: { topic: "Absorption Law", TotalQS: 18 },
  };

  const [activeTab, setActiveTab] = useState("All");
  const [isSticky, setIsSticky] = useState(false);
  const navbarRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        setIsSticky(window.pageYOffset > navbarRef.current.offsetTop);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={style.body}>
      <nav
        className={`${style.tabs} ${isSticky ? style.sticky : ""}`}
        ref={navbarRef}
      >
        <div
          className={`${style.tab} ${activeTab === "All" ? style.active : ""}`}
          onClick={() => setActiveTab("All")}
        >
          <center>All Questions (Notes)</center>
        </div>
        <div
          className={`${style.tab} ${
            activeTab === "TopicWise" ? style.active : ""
          }`}
          onClick={() => setActiveTab("TopicWise")}
        >
          <center>Important Questions (Notes)</center>
        </div>
        <hr className={style.hr} />
      </nav>

      <div className={style.questions_contener}>
        {activeTab === "TopicWise" ? (
          <TopicwisePrinter questions={questions} />
        ) : (
          <AllPrinter questions={questions} />
        )}
      </div>
    </div>
  );
}

export default Question;
