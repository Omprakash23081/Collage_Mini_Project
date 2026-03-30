import { NavLink } from "react-router-dom";
import style from "./Facelity_Directery.module.css";

function Facelity_Directery() {
  return (
    <div className={style.container1}>
      <header>
        <h1>Faculty Directory</h1>
        <p>Find faculty members by name, department, or designation.</p>
      </header>
      <div className={style.filterToolbar}>
        <div className={style.searchContainer}>
          <span className={style.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search by name..."
            className={style.searchInput}
          />
        </div>
        
        <div className={style.filterGroup}>
          <select className={style.filterSelect}>
            <option value="">All Departments</option>
            <option value="cs">Computer Science</option>
            <option value="math">Mathematics</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
          </select>
          <div className={style.divider}></div>
          <select className={style.filterSelect}>
            <option value="">All Designations</option>
            <option value="professor">Professor</option>
            <option value="assistant_professor">Assistant Professor</option>
            <option value="lecturer">Lecturer</option>
          </select>
        </div>

        <NavLink to="/faculty-directory" className={style.search_link}>
          <button className={style.search_button}>
            <b>Search</b>
          </button>
        </NavLink>
      </div>
      <div className={style.results}></div>
    </div>
  );
}
export default Facelity_Directery;
