//import css from './Navbars.module.css'we can import like this and use like className= {css["variable_like_className"]}
import {
  faBell,
  faBars,
  faTimes,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from "../../assets/images/StudySharpLogo.png";
import style from "./Navbar.module.css";
import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext.jsx";
import { feedbackService } from "../../services/feedbackService";
import apiClient from "../../services/apiClient";

function Navbar() {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handlePrimumClick = (e) => {
    if (user?.role === "student" && !user?.year) {
      e.preventDefault();
      setIsMenuOpen(false);
      toast.error("Please select your academic year first.");
      if (
        window.location.pathname !== "/home" &&
        window.location.pathname !== "/"
      ) {
        navigate("/home");
        setTimeout(() => {
          document
            .getElementById("yearBook")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      } else {
        document
          .getElementById("yearBook")
          ?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Global Debounced Search
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length > 2) {
        setIsSearching(true);
        try {
          const response = await apiClient.get(`/search?q=${searchQuery}`);
          if (response.data.success) {
            setSearchResults(response.data.data);
          }
        } catch (error) {
          console.error("Global search failed", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const response = await feedbackService.getUserFeedbacks();
      // Filter for unread responses
      const unread = response.data.filter((f) => f.response && !f.isRead);
      setNotifications(unread);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  const handleMarkAsRead = async (id) => {
    console.log("DEBUG: Marking notification as read:", id);
    try {
      await feedbackService.markAsRead(id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (error) {
      console.error("Failed to mark as read", error);
    }
  };

  return (
    <>
      <div className={style.contener}>
        <div className={style.left_side_navaction_bar}>
          <div className={style.image_navigation}>
            <img
              src={icon}
              alt="StudySharp Logo"
              className="rounded-lg bg-white"
              width="40"
              height="40"
              loading="lazy"
            />
            <Link to={user ? "/home" : "/"}>
              <b>StudySharp</b>
            </Link>
          </div>
          <div className={`${style.navLinks} ${isMenuOpen ? style.open : ""}`}>
            <div className={style.mobileHeader}>
              <button
                className={style.closeMenu}
                onClick={() => setIsMenuOpen(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className={style.Resource_navigation}>
              <div className={style.solution}>
                <Link to="/roadmaps" onClick={() => setIsMenuOpen(false)}>
                  Roadmaps
                </Link>
              </div>
            </div>
            <div className={style.Company_navigation}>
              <div className={style.solution}>
                <a href="#yearBook" onClick={() => setIsMenuOpen(false)}>
                  Features
                </a>
              </div>
            </div>
            {user && (
              <>
                <div className={style.solution}>
                  <Link
                    to="/primum/canteen"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Order
                  </Link>
                </div>
                <div className={style.solution}>
                  <Link to="/primum/print" onClick={() => setIsMenuOpen(false)}>
                    Print
                  </Link>
                </div>
              </>
            )}

            {/* Mobile-only Auth and Search */}
            <div className={style.mobileAuthSearch}>
              {!user ? (
                <NavLink
                  to="/login"
                  className={style.mobileLoginBtn}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </NavLink>
              ) : user.role === "admin" ? (
                <div className={style.dualButtonsMobile}>
                  <Link
                    to="https://sspadminpanal.netlify.app"
                    className={style.mobileLoginBtn}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/primum"
                    className={style.mobileLoginBtnSecondary}
                    onClick={(e) => {
                      setIsMenuOpen(false);
                      handlePrimumClick(e);
                    }}
                  >
                    Primum
                  </Link>
                </div>
              ) : (
                <Link
                  to={
                    user.role === "student" || user.role === "teacher"
                      ? "/primum"
                      : user.role === "canteen_vendor"
                        ? "/canteen"
                        : "/stationery"
                  }
                  className={style.mobileLoginBtn}
                  onClick={(e) => {
                    setIsMenuOpen(false);
                    handlePrimumClick(e);
                  }}
                >
                  {user.role === "student" ? "Primum" : "Dashboard"}
                </Link>
              )}
              <div className={style.mobileSearch}>
                <div className={style.mobileInputWrapper}>
                  <div className={style.mobileSearchInputContainer}>
                    <FontAwesomeIcon
                      icon={faSearch}
                      className={style.searchIconSmall}
                    />
                    <input
                      type="search"
                      placeholder="Search notes, pyqs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  {isSearching && (
                    <span className={style.searchingText}>...</span>
                  )}
                </div>
                {searchResults.length > 0 && (
                  <div className={style.mobileSearchResults}>
                    {searchResults.slice(0, 5).map((res, i) => (
                      <Link
                        key={i}
                        to={`/primum/notes/${res.subject}`}
                        onClick={() => {
                          setSearchQuery("");
                          setIsMenuOpen(false);
                        }}
                      >
                        {res.title || res.subject}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={style.Right_side_navaction_bar}>
          {user && (
            <div className={style.notificationWrapper}>
              <div
                className={style.bellIcon}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <FontAwesomeIcon icon={faBell} size="lg" />
                {notifications.length > 0 && (
                  <span className={style.notificationBadge}>
                    {notifications.length}
                  </span>
                )}
              </div>

              {showNotifications && (
                <div className={style.notificationDropdown}>
                  <h4 className={style.dropdownTitle}>Notifications</h4>
                  {notifications.length === 0 ? (
                    <p className={style.emptyMsg}>No new notifications</p>
                  ) : (
                    notifications.map((notif) => (
                      <div key={notif._id} className={style.notificationItem}>
                        <p className={style.notifTitle}>Admin replied:</p>
                        <p className={style.notifContent}>
                          {notif.response.substring(0, 50)}...
                        </p>
                        <button
                          onClick={() => handleMarkAsRead(notif._id)}
                          className={style.markReadBtn}
                        >
                          Mark as Read
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* Desktop Auth */}
          <div className={style.desktopOnly}>
            {!user ? (
              <div className={style.authWrapper}>
                <button className={style.navigation_Butten1}>
                  <NavLink to="/login">
                    <b>Login</b>
                  </NavLink>
                </button>
              </div>
            ) : (
              <div className={style.authWrapper}>
                {user.role === "admin" ? (
                  <div className={style.dualButtonsDesktop}>
                    <Link to="https://sspadminpanal.netlify.app" className={style.externalAdminBtn}>
                      <b>Dashboard</b>
                    </Link>
                    <Link
                      to="/primum"
                      className={style.internalPrimumBtn}
                      onClick={handlePrimumClick}
                    >
                      <b>Primum</b>
                    </Link>
                  </div>
                ) : (
                  <button className={style.navigation_Butten1}>
                    <Link
                      to={
                        user.role === "student" ||
                        user.role === "admin" ||
                        user.role === "teacher"
                          ? "/primum"
                          : user.role === "canteen_vendor"
                            ? "/canteen"
                            : user.role === "stationery_vendor"
                              ? "/stationery"
                              : "/home"
                      }
                      onClick={handlePrimumClick}
                    >
                      <b>{user.role === "student" ? "Primum" : "Dashboard"}</b>
                    </Link>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Desktop Search */}
          <div className={style.desktopOnly}>
            <div className={style.searchContainerWrapper}>
              <div className={style.searchContainer}>
                <div className={style.navigation_Butten2}>
                  <FontAwesomeIcon
                    icon={faSearch}
                    className={style.searchIconDesktop}
                  />
                  <input
                    type="search"
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className={style.butten}>
                  <button onClick={() => setSearchQuery("")}>Clear</button>
                </div>
              </div>

              {/* Search Results Dropdown */}
              {searchResults.length > 0 && (
                <div className={style.searchResultsDropdown}>
                  {searchResults.slice(0, 6).map((item, index) => (
                    <Link
                      key={index}
                      to={
                        item.type === "pyq"
                          ? `/primum/pyq/${item.subject}`
                          : `/primum/notes/${item.subject}`
                      }
                      className={style.searchResultItem}
                      onClick={() => setSearchQuery("")}
                    >
                      <span className={style.resultIcon}>
                        {item.type === "pyq" ? "📝" : "📖"}
                      </span>
                      <div className={style.resultInfo}>
                        <span
                          className={
                            item.isPremium
                              ? style.premiumTitle
                              : style.resultTitle
                          }
                        >
                          {item.title || item.subject}
                        </span>
                        <span className={style.resultType}>
                          {item.type.toUpperCase()} • {item.subject}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            className={style.mobileToggle}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <FontAwesomeIcon
              icon={isMenuOpen ? faTimes : faBars}
              size="lg"
              color="white"
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
