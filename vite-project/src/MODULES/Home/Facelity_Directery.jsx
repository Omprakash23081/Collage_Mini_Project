import { NavLink } from "react-router-dom";

function Facelity_Directery() {
  return (
    <div className="container1">
      <header>
        <h1>Faculty Directory</h1>
        <p>Find faculty members by name, department, or designation.</p>
      </header>
      <div className="search-bar1" id="search-bar">
        <input
          type="text"
          placeholder="Faculty Name"
          className="input-department"
        />
        <select className="input-department">
          <option value="disabled selected">Select Department</option>
          <option value="cs">Computer Science</option>
          <option value="math">Mathematics</option>
          <option value="physics">Physics</option>
          <option value="chemistry">Chemistry</option>
        </select>
        <select className="input-designation">
          <option value="" disabled selected>
            Select Designation
          </option>
          <option value="professor">Professor</option>
          <option value="assistant_professor">Assistant Professor</option>
          <option value="lecturer">Lecturer</option>
        </select>

        <a href="http://localhost:5502/FRANTENTS/HTML/FACALITY_DIRECATORY.html">
          <button className="search-button">
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
      <div className="results"></div>
    </div>
  );
}
export default Facelity_Directery;
