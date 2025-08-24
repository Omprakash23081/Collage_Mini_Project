import style from "./NOTES.module.css";
import Subject from "../SUBJECT/Subject";
import Chapter from "../CHAPTER/Chapter";
import ChapterContent from "../CHAPTERCONTENT/HEADER/ChapContHEADER";
import Question from "../CHAPTERCONTENT/QUESTION/Question.jsx";
import Manue from "../CHAPTERCONTENT/MANUE/MANUE.jsx";
import { useState } from "react";

function NOTES() {
  const [currencontent, setcontent] = useState("Subject");
  const [currentsubject, setsubject] = useState();
  function setcontents(value) {
    console.log(value);

    if (value[0] === "TopicWise") {
      setsubject(value[1]);
    } else {
      setcontent(value[0]);
      setsubject(value[1]);
    }
  }
  const icons = ["∫", "📏", "➡️", "📈", "🔄", "⚡", "🎯", "🔄", "🌍"];
  const SubjectName = [
    "Chapter 1",
    "Chapter 2",
    "Chapter 3",
    "Chapter 4",
    "Chapter 5",
    "Chapter 6",
  ];

  return (
    <div className={style.pyq}>
      {currencontent === "Subject" && <Subject setcontents={setcontents} />}

      {/* {currencontent === "Chapter" && (
        <Chapter
          icons={icons}
          SubjectName={SubjectName}
          setcontents={setcontents}
          currentsubject={currentsubject}
        />
      )} */}

      {currencontent === "AllQuestions" && (
        <>
          <ChapterContent
            setcontents={setcontents}
            currentsubject={currentsubject}
          />
          {/* <Manue /> */}
          <Question />
        </>
      )}
    </div>
  );
}
export default NOTES;
