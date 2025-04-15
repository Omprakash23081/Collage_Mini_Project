import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import icon from "..//PHOTO/icon.png";
import style from "./AllPrimum.module.css";
import { Link } from "react-router-dom";
function AllPrimum({ currentmanu, SetSidebar }) {
  function HandalOnClick(value) {
    SetSidebar(value);
  }

  return (
    <div
      id="SideBar"
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      style={{ width: "19%", height: "100vh" }}
    >
      <Link
        to="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <img src={icon} alt="" className="bi me-2" width="40" height="32" />

        <span className={style.fs_4}>THE ACHIVERS</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item" onClick={(event) => HandalOnClick("Home")}>
          <button
            className={`nav-link ${currentmanu === "Home" && style.active} `}
            aria-current="page"
          >
            <i className="bi bi-house-door"></i> <h6>Home</h6>
          </button>
        </li>
        <li className="nav-item" onClick={(event) => HandalOnClick("Corses")}>
          <button
            className={`nav-link  ${currentmanu === "Corses" && style.active} `}
            aria-current="page"
          >
            <i className="bi bi-book"></i> <h6>Corses</h6>
          </button>
        </li>
        <li className="nav-item" onClick={(event) => HandalOnClick("PYQ")}>
          <button
            className={`nav-link  ${currentmanu === "PYQ" && style.active} `}
            aria-current="page"
          >
            <i className="bi bi-journal-bookmark-fill"></i> <h6>PYQ</h6>
          </button>
        </li>
        <li className="nav-item" onClick={(event) => HandalOnClick("Premium")}>
          <button
            className={`nav-link   ${
              currentmanu === "Premium" && style.active
            } `}
            aria-current="page"
          >
            <i className="bi bi-award"></i> <h6>Premium</h6>
          </button>
        </li>
        <li className="nav-item" onClick={(event) => HandalOnClick("Profile")}>
          <button
            className={`nav-link   ${
              currentmanu === "Profile" && style.active
            } `}
            aria-current="page"
          >
            <i className="bi bi-person-circle"></i> <h6>Profile</h6>
          </button>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <a
          href="#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src={icon}
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>Omprakash</strong>
        </a>
        <ul
          className="dropdown-menu dropdown-menu-dark text-small shadow"
          aria-labelledby="dropdownUser1"
        >
          <li>
            <a className="dropdown-item" href="#">
              New project...
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Settings
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Profile
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default AllPrimum;
