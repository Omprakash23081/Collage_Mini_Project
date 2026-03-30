import style from "./NOTES.module.css";
import Subject from "../Subject/Subject";
import ChapterContent from "../ChapterContent/HEADER/ChapContHEADER";
import Notes from "../ChapterContent/QUESTION/Note.jsx";
import { useParams } from "react-router-dom";
import { useData } from "../../../context/GlobalContext.jsx";

function NOTES() {
  const { subjectName } = useParams();
  const { dataLoading } = useData();

  if (dataLoading) {
    return (
      <div className={style.loadingContainer}>
        <div className={style.loader}>Loading Resources...</div>
      </div>
    );
  }

  return (
    <div className={style.pyq}>
      {!subjectName ? (
        <Subject />
      ) : (
        <>
          <ChapterContent
            currentsubject={subjectName}
          />
          <Notes currentsubject={subjectName} />
        </>
      )}
    </div>
  );
}
export default NOTES;
