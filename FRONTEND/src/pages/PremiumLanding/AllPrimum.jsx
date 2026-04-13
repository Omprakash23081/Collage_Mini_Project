import { Link, NavLink, Outlet } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useState } from "react";
import icon from "../../assets/images/StudySharpLogo.png";
import style from "./AllPrimum.module.css";
import { AuthContext } from "../../context/AuthContext.jsx";
import { useData } from "../../context/GlobalContext.jsx";
import { useRequireYear } from "../../hooks/useRequireYear.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getSocket } from "../../utils/socket";

function AllPrimum() {
  const navigate = useNavigate();
  const { dataLoading } = useData();
  useRequireYear(); // Centralized guard

  const menuItems = [
    { go: "", icon: "bi-house-door", name: "Home", exact: true },
    { go: "notes", icon: "bi-book", name: "Notes" },
    { go: "pyq", icon: "bi-journal-bookmark-fill", name: "PYQ" },
    { go: "canteen", icon: "bi-cart-fill", name: "Food" },
    { go: "print", icon: "bi-printer-fill", name: "Print" },
    { go: "premium", icon: "bi-award", name: "Premium" },
    { go: "profile", icon: "bi-person-circle", name: "Profile" },
  ];
  const [loadingLocal, setLoadingLocal] = useState(false);
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const socket = getSocket();
    if (socket) {
      socket.on("order_update", (data) => {
        toast.success(data.message, {
          duration: 5000,
          icon: '🍕'
        });
      });

      socket.on("print_update", (data) => {
        toast.success(data.message, {
          duration: 5000,
          icon: '🖨️'
        });
      });
    }

    return () => {
      if (socket) {
        socket.off("order_update");
        socket.off("print_update");
      }
    };
  }, []);

  const LogoutUser = async (e) => {
    e.preventDefault();
    setLoadingLocal(true);
    try {
      await logout();
      toast.success("Good Bye");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    } finally {
      setLoadingLocal(false);
    }
  };

  /* Drawer logic removed as per user request to restore bottom bar */

  return (
    <div className={style.layoutContainer}>
      {/* Space Animation Background */}
      <div className={style.background_animation}>

        <div className={style.stars}></div>
        <div className={style.stars2}></div>
      </div>
      {/* Sidebar for Desktop */}
      <aside className={`${style.sidebar} d-none d-md-flex`}>
        <div className={style.sidebarHeader}>
          <Link
            to="/home"
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
              <span className={`${style.userName} fw-bold`}>{user?.name || "User"}</span>
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
        {dataLoading && (
          <div className={style.globalLoadingBar}>
            <div className={style.progress}></div>
          </div>
        )}
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
            <span className={style.navLinkName}>{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default AllPrimum;
