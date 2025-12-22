import style from "./PYQ03.module.css";
import PYQ03ALLQUESTION from "./PYQ03ALLQUESTION.jsx";
import PYQ03TOPICKWISE from "./PYQ03TOPICKWISE.jsx";
// import PYQ03SUBTOPICWISE from "./PYQ03(ALLTOPICK).jsx"; // Unused now
import PYQ03MANUE from "./PYQ03MANUE.jsx"; // Imported
import PYQ03HEADERS from "./PYQ03HEADER.jsx";
import { useState, useRef, useEffect } from "react";
import Solution from "./Solution.jsx";

function PYQ03({ setcontents, currentsubject }) {
  const [solution, SetSolution] = useState({});
  const [showMenu, setShowMenu] = useState("TopicWise"); // Default to TopicWise
  const [selectedTopic, setSelectedTopic] = useState("");
  const [id, SetId] = useState("");
  const [currentfilter, setcurrentfilter] = useState("All"); // Added filter state
  const navbarRef = useRef();

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

  const handleMenuChange = (menu) => {
    const [menuType, data] = menu;
    setShowMenu(menuType);
    if (menuType === "Topic") {
      setSelectedTopic(data);
      SetId("");
    } else if (menuType === "") {
      SetId(data);
    } else {
      SetId("");
      setSelectedTopic("");
    }
  };

  console.log(id);

  return (
    <>
      {id ? (
        <>
          <Solution id={id} handleMenuChange={handleMenuChange} />
        </>
      ) : (
        <>
          {" "}
          <div className={style.body}>
            <PYQ03HEADERS set={setcontents} currentsubject={currentsubject} />
            <nav className={style.tabs} ref={navbarRef}>
              <div
                className={`${style.tab} ${
                  showMenu === "All" ? style.active : ""
                }`}
                onClick={() => handleMenuChange(["All"])}
              >
                <center>All Questions (PYQ)</center>
              </div>
              <div
                className={`${style.tab} ${
                  showMenu === "TopicWise" || showMenu === "Topic"
                    ? style.active
                    : ""
                }`}
                onClick={() => handleMenuChange(["TopicWise"])}
              >
                <center>Chapater-Wise (PYQ)</center>
              </div>
            </nav>
            {/* <hr className={style.hr} /> */}

            {(showMenu === "TopicWise" || showMenu === "All") && (
              <PYQ03MANUE
                currentfilter={currentfilter}
                setcurrentfilter={setcurrentfilter}
              />
            )}

            <div className={style.questions_contener}>
              {showMenu === "All" && (
                <PYQ03ALLQUESTION
                  handleMenuChange={handleMenuChange}
                  currentFilter={currentfilter}
                />
              )}
              {showMenu === "Topic" && (
                <PYQ03TOPICKWISE selectedTopic={selectedTopic} />
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default PYQ03;
