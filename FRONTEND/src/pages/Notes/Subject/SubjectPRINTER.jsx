import style from "./SubjectPRINTER.module.css";


import { useNavigate } from "react-router-dom";

function SubjectPRINTER({ value, chapter }) {
  const navigate = useNavigate();
  const subject = ["physics", "chemistry", "mathematics"];
  return (
    <div
      className={`${style.subject_card} ${style[value]} `}
      onClick={() => {
          navigate(`/primum/notes/${value}`);
      }}
    >
      <div>
        <h2 className={style.subject_title}>{value}</h2>
        <div className={style.subject_icon}>
          <img
            src={`https://cdn-assets.getmarks.app/app_assets/img/cpyqb/subjects/ic_${
              subject[chapter % subject.length]
            }_icon_with_illustration.svg`}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default SubjectPRINTER;
