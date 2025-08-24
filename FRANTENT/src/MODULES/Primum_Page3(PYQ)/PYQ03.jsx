import style from "./PYQ03.module.css";
import PYQ03ALLQUESTION from "./PYQ03ALLQUESTION.jsx";
import PYQ03TOPICKWISE from "./PYQ03TOPICKWISE.jsx";
import PYQ03SUBTOPICWISE from "./PYQ03SUBTOPICWISE.jsx";
import PYQ03HEADERS from "./PYQ03HEADER.jsx";
import { useState, useRef, useEffect } from "react";

const questions = {
  1: {
    q: 1,
    question: "What is the capital of France?",
    year: [2024, 2024],
    topic: "important",
    attempted: true,
    mostImportant: false,
  },
  2: {
    q: 2,
    question: "What is the capital of Germany?",
    year: [2019, 2025],
    topic: "important",
    attempted: false,
    mostImportant: true,
  },
  3: {
    q: 3,
    question: "What is the capital of Italy?",
    year: [2022, 2023],
    topic: "important",
    attempted: true,
    mostImportant: true,
  },
  4: {
    q: 4,
    question: "What is the capital of France?",
    year: [2024, 2024],
    topic: "basic",
    attempted: false,
    mostImportant: false,
  },
  5: {
    q: 5,
    question: "What is the capital of Germany?",
    year: [2019, 2025],
    topic: "basic",
    attempted: true,
    mostImportant: false,
  },
  6: {
    q: 6,
    question: "What is the capital of Italy?",
    year: [2022, 2023],
    topic: "important",
    attempted: false,
    mostImportant: true,
  },
};

const Topic = {
  1: { topic: "Niwtan Law", TotalQS: 26 },
  2: { topic: "Faraday law", TotalQS: 16 },
  3: { topic: "Absorption Law", TotalQS: 18 },
};

function PYQ03({ setcontents, currentsubject }) {
  const [showMenu, setShowMenu] = useState("All");
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");
  const navbarRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        navbarRef.current.classList.toggle(
          style.sticky,
          window.pageYOffset > navbarRef.current.offsetTop
        );
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuChange = (menu) => {
    setShowMenu(menu[0]);
    if (menu[0] === "Topic") {
      setTopic(menu[1]);
    } else {
      setTopic("");
    }
    if (menu[0] === "") {
      setQuestion(menu[1]);
    } else {
      setQuestion("");
      // setShowMenu("All");
    }
  };

  return (
    <div className={style.body}>
      <PYQ03HEADERS
        count={Object.keys(questions).length}
        set={setcontents}
        currentsubject={currentsubject}
        question={question}
      />
      <nav className={style.tabs} ref={navbarRef}>
        <div
          className={`${style.tab} ${showMenu === "All" ? style.active : ""}`}
          onClick={() => handleMenuChange(["All"])}
        >
          <center>All Questions</center>
        </div>
        <div
          className={`${style.tab} ${
            showMenu === "TopicWise" || showMenu === "Topic" ? style.active : ""
          }`}
          onClick={() => handleMenuChange(["TopicWise"])}
        >
          <center>Topic-Wise{topic && `: ${topic}`}</center>
        </div>
        <hr className={style.hr} />
      </nav>
      <div className={style.questions_contener}>
        {showMenu === "TopicWise" && (
          <PYQ03SUBTOPICWISE
            Topic={Topic}
            handleMenuChange={handleMenuChange}
            setcontents={setcontents}
          />
        )}
        {showMenu === "All" && (
          <PYQ03ALLQUESTION
            questions={questions}
            handleMenuChange={handleMenuChange}
          />
        )}
        {showMenu === "Topic" && <PYQ03TOPICKWISE questions={questions} />}
      </div>
    </div>
  );
}

export default PYQ03;
