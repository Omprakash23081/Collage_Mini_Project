import { NavLink } from "react-router-dom";
import style from "./Facelity_Directery.module.css";

function Facelity_Directery() {
  return (
    <div className={style.container1}>
      <header>
        <h1>Faculty Directory</h1>
        <p>Find faculty members by name, department, or designation.</p>
      </header>
      <div className={style.search_bar1} id={style.search_bar}>
        <input
          type="text"
          placeholder="Faculty Name"
          className={style.input_department}
        />
        <select className={style.input_department}>
          <option value="disabled selected">Select Department</option>
          <option value="cs">Computer Science</option>
          <option value="math">Mathematics</option>
          <option value="physics">Physics</option>
          <option value="chemistry">Chemistry</option>
        </select>
        <select className={style.input_designation}>
          <option value="" disabled selected>
            Select Designation
          </option>
          <option value="professor">Professor</option>
          <option value="assistant_professor">Assistant Professor</option>
          <option value="lecturer">Lecturer</option>
        </select>

        <a href="http://localhost:5502/FRANTENTS/HTML/FACALITY_DIRECATORY.html">
          <button className={style.search_button}>
            {" "}
            <NavLink
              to="/Faculty&Directory"
              className={(navData) => (navData.isActive ? "active" : "")}
            >
              <b>Search</b>
            </NavLink>
          </button>
        </a>
      </div>
      <div className={style.results}></div>
    </div>
  );
}
export default Facelity_Directery;
