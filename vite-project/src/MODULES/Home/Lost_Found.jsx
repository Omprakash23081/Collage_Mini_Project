// import style from "./Lost_Found.nodule.css"
import { Link, NavLink } from "react-router-dom";

function Lost_Found() {
  return (
    <div className="container_Lost_found">
      <div className="headers">
        <h1>Lost & Found</h1>
        <p>
          Did you lose valuables inside the airport premises? Tell us about it,
          so that we can find it for you.
        </p>
      </div>
      <div className="search-bar1">
        <input type="text" placeholder="Name of Name" className="input-name" />
        <input type="date" className="input-date" />
        <select className="input-terminal">
          <option value="" disabled selected>
            COURSE
          </option>
          <option value="T1">B-TECH</option>
          <option value="T2">MCA</option>
          <option value="T3">BCA</option>
        </select>
        <a href="http://localhost:5502/FRANTENTS/HTML/LOSE%26FOUND.html">
          <button className="search-button">
            <NavLink
              to="/Lost&Found"
              className={(navData) => (navData.isActive ? "active" : "")}
            >
              <b> → </b>
            </NavLink>
          </button>
        </a>
      </div>
    </div>
  );
}
export default Lost_Found;
