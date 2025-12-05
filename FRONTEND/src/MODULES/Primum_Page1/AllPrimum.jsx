import { Link, NavLink, Outlet } from "react-router-dom"; // Add Outlet import
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useState, navigate } from "react";
import icon from "..//PHOTO/icon.png";
import style from "./AllPrimum.module.css";
import { AuthContext } from "../../context/AuthContext.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AllPrimum() {
  const navigate = useNavigate();
  const menuItems = [
    { go: "", icon: "bi-house-door", name: "Home", exact: true },
    { go: "notes", icon: "bi-book", name: "Notes" },
    { go: "pyq", icon: "bi-journal-bookmark-fill", name: "PYQ" },
    { go: "premium", icon: "bi-award", name: "Premium" },
    { go: "profile", icon: "bi-person-circle", name: "Profile" },
  ];
  const [loading, setLoading] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const LogoutUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await logout();
      toast.success("Good By");
      navigate("/login");
    } catch (error) {
      console.log(error, "for errer in logout");

      toast.error(error?.response?.data?.message + " Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.layoutContainer}>
      {/* Sidebar for desktop */}
      <div className={`${style.sidebar} d-none d-md-flex flex-column flex-shrink-0 p-3 text-white bg-dark`}>
        <Link
          to="/"
          className="d-flex align-items-center mb-3 text-white text-decoration-none"
        >
          <img src={icon} alt="logo" className="me-2" width="40" height="32" />
          <span className={style.fs_4}>THE ACHIVERS</span>
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          {menuItems.map((item) => (
            <li key={item.name} className="nav-item">
              <NavLink
                to={item.go === "" ? "/primum" : `/primum/${item.go}`}
                end={item.go === ""}
                className={({ isActive }) =>
                  `nav-link d-flex align-items-center gap-2 ${
                    isActive ? style.active : "text-white"
                  }`
                }
              >
                <i className={`bi ${item.icon}`}></i>
                <h6 className="mb-0">{item.name}</h6>
              </NavLink>
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
              src={user?.profileImage}
              alt="profile"
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
            <li onClick={LogoutUser}>
              <a className="dropdown-item" href="#">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main content area */}
      <div className={style.mainContent}>
        <Outlet />
      </div>

      {/* Bottom bar for mobile */}
      <div className="d-md-none fixed-bottom bg-black border-top d-flex justify-content-around py-2 shadow">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.go === "" ? "/primum" : `/primum/${item.go}`}
            end={item.go === ""}
            className={({ isActive }) =>
              `btn text-white d-flex flex-column align-items-center ${
                isActive ? style.activeBottom : ""
              }`
            }
          >
            <i
              className={`bi ${item.icon} ${style.icon} fs-5`}
              style={{ marginLeft: "6px" }}
            ></i>
            <small>{item.name}</small>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default AllPrimum;
