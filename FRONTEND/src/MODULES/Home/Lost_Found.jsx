import { NavLink } from "react-router-dom";
import styles from "./Lost_Found.module.css";

function Lost_Found() {
  return (
    <div className={styles.container_Lost_found}>
      <div className={styles.headers}>
        <h1>Lost & Found</h1>
        <p>
          Did you lose valuables inside the airport premises? Tell us about it,
          so that we can find it for you.
        </p>
      </div>
      <div className={styles.search_bar1}>
        <input
          type="text"
          placeholder="Name of Name"
          className={styles.input_name}
        />
        <input type="date" className={styles.input_date} />
        <select className={styles.input_terminal}>
          <option value="" disabled selected>
            COURSE
          </option>
          <option value="T1">B-TECH</option>
          <option value="T2">MCA</option>
          <option value="T3">BCA</option>
        </select>
        <a href="">
          <NavLink
            to="/Lost-Found"
            className={(navData) => (navData.isActive ? "active" : "")}
          >
            <button className={styles.search_button}>
              <b>→</b>{" "}
            </button>
          </NavLink>
        </a>
      </div>
    </div>
  );
}
export default Lost_Found;
