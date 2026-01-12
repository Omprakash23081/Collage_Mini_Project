import { Link, NavLink, Outlet } from "react-router-dom"; // Add Outlet import
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useState, useEffect } from "react";
import icon from "../PHOTO/StudySharpLogo.png";
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
  const [loadingLocal, setLoadingLocal] = useState(false);
  const { user, logout, loading: authLoading } = useContext(AuthContext);

  useEffect(() => {
    console.log("[AllPrimum] Auth Check:", {
      authLoading,
      user: user ? user.name : "null",
    });
    if (!authLoading) {
      if (!user) {
        console.log("[AllPrimum] No user, redirecting to /login");
        navigate("/login");
      } else if (!user.year) {
        console.log("[AllPrimum] No year, redirecting to /");
        toast.error("Please select your year first");
        navigate("/");
      }
    }
  }, [user, authLoading, navigate]);

  const LogoutUser = async (e) => {
    e.preventDefault();
    setLoadingLocal(true);
    try {
      await logout();

      toast.success("Good By");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message + " Login failed");
    } finally {
      setLoadingLocal(false);
    }
  };

  /* Drawer logic removed as per user request to restore bottom bar */

  return (
    <div className={style.layoutContainer}>
      {/* Sidebar for Desktop */}
      <aside className={`${style.sidebar} d-none d-md-flex`}>
        <div className={style.sidebarHeader}>
          <Link
            to="/"
            className="d-flex align-items-center text-decoration-none"
          >
            <img
              src={icon}
              alt="logo"
              width="32"
              height="32"
              className="rounded bg-white"
            />
            <span className={style.brandText}>StudySharp</span>
          </Link>
        </div>

        <nav className="flex-grow-1">
          {menuItems.map((item) => (
            <div key={item.name} className={style.navItem}>
              <NavLink
                to={item.go === "" ? "/primum" : `/primum/${item.go}`}
                end={item.go === ""}
                className={({ isActive }) =>
                  `${style.navLink} ${isActive ? style.active : ""}`
                }
              >
                <i className={`bi ${item.icon}`}></i>
                <span>{item.name}</span>
              </NavLink>
            </div>
          ))}
        </nav>

        <div className={style.userSection}>
          <div className="dropdown">
            <a
              href="#"
              className={style.userDropdown}
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={user?.profileImage || "https://via.placeholder.com/32"}
                alt="profile"
                width="32"
                height="32"
                className="rounded-circle me-2"
              />
              <span className="text-white fw-bold">{user?.name || "User"}</span>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-dark text-small shadow"
              aria-labelledby="dropdownUser1"
            >
              <li>
                <Link className="dropdown-item" to="/primum/profile">
                  Profile
                </Link>
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
      </aside>

      {/* Main content area */}
      <main className={style.mainContent}>
        <Outlet />
      </main>

      {/* Bottom Navigation Bar (Mobile) */}
      <div className={style.bottomNav}>
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.go === "" ? "/primum" : `/primum/${item.go}`}
            end={item.go === ""}
            className={({ isActive }) =>
              `${style.bottomNavLink} ${isActive ? style.activeBottom : ""}`
            }
          >
            <i className={`bi ${item.icon}`}></i>
            <span className="naveLinckName">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default AllPrimum;
