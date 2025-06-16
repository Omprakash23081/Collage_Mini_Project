import style from "./PYQ03.module.css";
import PYQ03ALLQUESTION from "./PYQ03ALLQUESTION.jsx";
import PYQ03TOPICKWISE from "./PYQ03TOPICKWISE.jsx";
import PYQ03SUBTOPICWISE from "./PYQ03SUBTOPICWISE.jsx";
import PYQ03HEADERS from "./PYQ03HEADER.jsx";
import { useState, useRef, useEffect } from "react";

function PYQ03({ setcontents, currentsubject }) {
  const questions = {
    1: {
      question: "What is the capital of France?",
      year: [2024, 2024],
      topic: "important",
    },
    2: {
      question: "What is the capital of Germany?",
      year: [2019, 2025],
      topic: "important",
    },
    3: {
      question: "What is the capital of Italy?",
      year: [2022, 2023],
      topic: "important",
    },
    4: {
      question: "What is the capital of France?",
      year: [2024, 2024],
      topic: "important",
    },
    5: {
      question: "What is the capital of Germany?",
      year: [2019, 2025],
    },
    6: {
      question: "What is the capital of Italy?",
      year: [2022, 2023],
      topic: "important",
    },
  };

  const Topic = {
    1: {
      topic: "Niwtan Law ",
      TotalQS: 26,
    },
    2: {
      topic: "Faraday law",
      TotalQS: 16,
    },
    3: {
      topic: "Absorption Law",
      TotalQS: 18,
    },
  };

  const [showmanue, setshowmanue] = useState("All");
  const [isSticky, setIsSticky] = useState(false);
  const navbarRef = useRef();
  const count = useRef(Object.keys(questions).length);

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        const navbarOffset = navbarRef.current.offsetTop;
        setIsSticky(window.pageYOffset > navbarOffset);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function set1(value) {
    if (!questions) return;
    count.current = Object.keys(questions).length;

    setshowmanue(value[0]);
    if (value[0] === "TopicWise") {
      setcontents(value[1]);
    }
  }

  function set(value) {
    setcontents(value);
  }

  return (
    <div className={style.body}>
      <PYQ03HEADERS
        count={count.current}
        set={set}
        currentsubject={currentsubject}
      />

      <nav
        className={`${style.tabs} ${isSticky ? style.sticky : ""}`}
        ref={navbarRef}
      >
        <div
          className={`${style.tab} ${showmanue === "All" ? style.active : ""}`}
          onClick={() => set1(["All"])}
        >
          <center>All Questions</center>
        </div>

        <div
          className={`${style.tab} ${
            showmanue === "TopicWise" ? style.active : ""
          }`}
          onClick={() => set1(["TopicWise"])}
        >
          <center>Topic-Wise</center>
        </div>
        <hr className={style.hr} />
      </nav>

      <div className={style.questions_contener}>
        {showmanue === "TopicWise" && (
          <PYQ03SUBTOPICWISE
            Topic={Topic}
            set1={set1}
            setcontents={setcontents}
          />
        )}

        {showmanue === "All" && <PYQ03ALLQUESTION questions={questions} />}

        {showmanue === "Topic" && <PYQ03TOPICKWISE questions={questions} />}
      </div>
    </div>
  );
}

export default PYQ03;
