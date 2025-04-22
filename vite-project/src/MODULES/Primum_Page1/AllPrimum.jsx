import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import icon from "..//PHOTO/icon.png";
import style from "./AllPrimum.module.css";
import { Link } from "react-router-dom";

function AllPrimum({ currentmanu, SetSidebar }) {
  function HandalOnClick(value) {
    SetSidebar(value);
  }

  const menuItems = [
    { name: "Home", icon: "bi-house-door" },
    { name: "Corses", icon: "bi-book" },
    { name: "PYQ", icon: "bi-journal-bookmark-fill" },
    { name: "Premium", icon: "bi-award" },
    { name: "Profile", icon: "bi-person-circle" },
  ];

  return (
    <>
      {/* Sidebar for desktop */}
      <div
        id="SideBar"
        className="d-none d-md-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
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
          {menuItems.map((item) => (
            <li
              key={item.name}
              className="nav-item"
              onClick={() => HandalOnClick(item.name)}
            >
              <button
                className={`nav-link ${
                  currentmanu === item.name ? style.active : ""
                }`}
                aria-current="page"
              >
                <i className={`bi ${item.icon}`}></i> <h6>{item.name}</h6>
              </button>
            </li>
          ))}
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

      {/* Bottom bar for mobile */}
      <div className="d-md-none fixed-bottom bg-white border-top d-flex justify-content-around py-2 shadow">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => HandalOnClick(item.name)}
            className={`btn text-dark d-flex flex-column align-items-center ${
              currentmanu === item.name ? style.activeBottom : ""
            }`}
          >
            <i className={`bi ${item.icon} ${style.icon} fs-5`}></i>
            <small>{item.name}</small>
          </button>
        ))}
      </div>
    </>
  );
}

export default AllPrimum;
