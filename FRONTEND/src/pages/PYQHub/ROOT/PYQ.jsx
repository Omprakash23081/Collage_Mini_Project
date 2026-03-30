import Pyq01 from "../PYQ01.jsx";
import Pyq02 from "../PYQ02.jsx";
import Pyq03 from "../QuestionPage/PYQ03.jsx";
import style from "./PYQ.module.css";
import { useParams } from "react-router-dom";
import { useData } from "../../../context/GlobalContext.jsx";

function Pyq() {
  const { subjectName } = useParams();
  const { dataLoading } = useData();

  if (dataLoading) {
    return (
      <div className={style.loadingContainer}>
        <div className={style.loader}>Loading PYQs...</div>
      </div>
    );
  }

  return (
    <div className={style.pyq}>
      {!subjectName ? (
        <Pyq02 />
      ) : (
        <Pyq03 currentsubject={subjectName} />
      )}
    </div>
  );
}
export default Pyq;
{
  /* <div onClick={() => setcontent("second")} */
}
