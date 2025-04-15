import style from "./PYQ03.module.css";
import PYQ03ALLQUESTION from "./PYQ03ALLQUESTION.jsx";
import PYQ03TOPICKWISE from "./PYQ03TOPICKWISE.jsx";
import PYQ03SUBTOPICWISE from "./PYQ03SUBTOPICWISE.jsx";
import PYQ03HEADERS from "./PYQ03HEADER.jsx";
import { useState, useRef, useEffect } from "react";

function PYQ03({ setcontents, currentsubject }) {
  const [showmanue, setshowmanue] = useState("All");
  // const [headshowmanue, headsetshowmanue] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const navbarRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (navbarRef.current) {
        const navbarOffset = navbarRef.current.offsetTop;
        if (window.pageYOffset > navbarOffset) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  const count = useRef(Object.keys(questions).length);

  function set1(value) {
    if (showmanue === "All") {
      count.current = Object.keys(questions).length;
    } else {
      count.current = Object.keys(questions).length;
    }
    console.log(value);
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

      <PYQ03HEADERS count={count} set={set} currentsubject={currentsubject} />

      <nav
        className={`${style.tabs} ${isSticky ? style.sticky : ""}`}
        ref={navbarRef}
      >
        <div
          className={`${style.tab} ${showmanue === "All" && style.active}`}
          onClick={(event) => set1(["All"])}
        >
          <center>All Questions</center>{" "}
        </div>

        <div
          className={`${style.tab} ${(showmanue === "TopicWise" || showmanue === "Topic Wise") &&
            style.active
            }`}
          onClick={(event) => set1(["Topic Wise"])}
        >
          <center>Topic-Wise</center>
        </div>
        <hr className={style.hr} />
      </nav>


      <div className={style.questions_contener}>
        {/* this comes after clicking on subtopic like newton law of motion  */}
        {showmanue === "TopicWise" && <PYQ03TOPICKWISE questions={questions} />}
        {/* this is subtopic like newtan law of motion */}
        {showmanue === "Topic Wise" ? (
          <PYQ03SUBTOPICWISE Topic={Topic} set1={set1} setcontents={setcontents} />
        ) :
          <PYQ03SUBTOPICWISE questions={questions} />
        }
        {showmanue === "All" && <PYQ03ALLQUESTION questions={questions} />}
      </div>
    </div>
  );
}
export default PYQ03;

{
  /* <PYQ03TOPICKWISE questions={questions} */
}
