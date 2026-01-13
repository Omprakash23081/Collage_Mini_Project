//import css from './Navbars.module.css'we can import like this and use like className= {css["variable_like_className"]}
import { faBell, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icon from "../PHOTO/StudySharpLogo.png";
import style from "./Navbars.module.css";
import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AppContext } from "../../context/AppContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { feedbackService } from "../../services/feedbackService";

function Navbar() {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const response = await feedbackService.getUserFeedbacks();
      // Filter for unread responses
      const unread = response.data.filter(
        (f) => f.response && !f.isRead
      );
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
            <img src={icon} alt="StudySharp" className="rounded-lg bg-white" />
            <Link to="/">
              <b>StudySharp</b>
            </Link>
          </div>

          <div
            className={style.mobileToggle}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" color="white" />
          </div>

          <div className={`${style.navLinks} ${isMenuOpen ? style.open : ""}`}>
            <div className={style.language_navigation}>
              <div className={style.language}>
                <h2>Language</h2>
              </div>
              <div className={style.language_name}>
                <div className={style.languages}><center>Hindi</center></div>
                <div className={style.languages}><center>English</center></div>
                <div className={style.languages}><center>Bengali</center></div>
                <div className={style.languages}><center>Marathi</center></div>
                <div className={style.languages}><center>Telugu</center></div>
                <div className={style.languages}><center>Tamil</center></div>
                <div className={style.languages}><center>Gujarati</center></div>
                <div className={style.languages}><center>Urdu</center></div>
                <div className={style.languages}><center>Kannada</center></div>
                <div className={style.languages}><center>Odia</center></div>
                <div className={style.languages}><center>Malayalam</center></div>
              </div>
            </div>

            <div className={style.Resource_navigation}>
              <div className={style.solution}>
                <h4><Link to="/roadmaps">Roadmaps</Link></h4>
              </div>
            </div>
            <div className={style.Company_navigation}>
              <div className={style.solution}>
                <a href="#yearBook"><h4>Features</h4></a>
              </div>
            </div>
          </div>
        </div>

        <div
          className={style.Right_side_navaction_bar}
        >
          {user && (
            <div className={style.notificationWrapper} style={{ position: 'relative', marginRight: '15px' }}>
              <div 
                className={style.bellIcon} 
                onClick={() => setShowNotifications(!showNotifications)}
                style={{ cursor: 'pointer', position: 'relative', color: 'white' }}
              >
                <FontAwesomeIcon icon={faBell} size="lg" />
                {notifications.length > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius: '50%',
                    padding: '2px 5px',
                    fontSize: '10px',
                    fontWeight: 'bold'
                  }}>
                    {notifications.length}
                  </span>
                )}
              </div>
              
              {showNotifications && (
                <div className={style.notificationDropdown} style={{
                  position: 'absolute',
                  top: '30px',
                  right: '0',
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  width: '300px',
                  zIndex: 1000,
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  padding: '10px'
                }}>
                  <h4 style={{ margin: '0 0 10px 0', borderBottom: '1px solid #374151', paddingBottom: '5px', color:'white' }}>Notifications</h4>
                  {notifications.length === 0 ? (
                    <p style={{ color: '#9ca3af', fontSize: '14px' }}>No new notifications</p>
                  ) : (
                    notifications.map((notif) => (
                      <div key={notif._id} style={{
                        marginBottom: '10px',
                        backgroundColor: '#374151',
                        padding: '8px',
                        borderRadius: '4px',
                        fontSize: '13px'
                      }}>
                        <p style={{ fontWeight: 'bold', marginBottom: '4px', color: '#e5e7eb' }}>Admin replied:</p>
                        <p style={{ color: '#d1d5db', marginBottom: '8px' }}>{notif.response.substring(0, 50)}...</p>
                        <button 
                          onClick={() => handleMarkAsRead(notif._id)}
                          style={{
                            backgroundColor: '#2563eb',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '2px 8px',
                            fontSize: '11px',
                            cursor: 'pointer'
                          }}
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

          {!user ? (
            <div className={style.authWrapper}>
              <button className={style.navigation_Butten1}>
                <NavLink to="/Login">
                  <b>Login....</b>
                </NavLink>
              </button>
            </div>
          ) : (
            <div className={style.authWrapper}>
              <button className={style.navigation_Butten1}>
                {user.year ? (
                  <Link to="/Primum">
                    <b>Primum</b>
                  </Link>
                ) : (
                  <a href="#yearBook">
                    <b>Primum</b>
                  </a>
                )}
              </button>
            </div>
          )}
          <div className={style.searchContainer}>
            <div className={style.navigation_Butten2}>
              <input type="search" placeholder="Search..." />
            </div>
            <div className={style.butten}>
              <button>Search</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
