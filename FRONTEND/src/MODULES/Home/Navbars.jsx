//import css from './Navbars.module.css'we can import like this and use like className= {css["variable_like_className"]}
import icon from "../PHOTO/icon.png";
import style from "./Navbars.module.css";
import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AppContext } from "../../context/AppContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";

function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className={style.contener}>
        <div className={style.left_side_navaction_bar}>
          <div className={style.image_navigation}>
            <img src={icon} alt="THE ACHIEVERS" />
            <Link to="/">
              <b>Studysharp</b>
            </Link>
          </div>
          <div className={style.language_navigation}>
            <div className={style.language}>
              <h2>Language</h2>
            </div>
            <div className={style.language_name}>
              <div className={style.languages}>
                <center>Hindi</center>
              </div>
              <div className={style.languages}>
                <center>English</center>
              </div>
              <div className={style.languages}>
                <center>Bengali</center>
              </div>
              <div className={style.languages}>
                <center>Marathi</center>
              </div>
              <div className={style.languages}>
                <center> Telugu</center>
              </div>
              <div className={style.languages}>
                <center>Tamil</center>
              </div>
              <div className={style.languages}>
                <center>Gujarati</center>
              </div>
              <div className={style.languages}>
                <center> Urdu</center>
              </div>
              <div className={style.languages}>
                <center> Kannada</center>
              </div>
              <div className={style.languages}>
                <center> Odia</center>
              </div>
              <div className={style.languages}>
                <center>Malayalam</center>
              </div>
            </div>
          </div>


          <div className={style.Resource_navigation}>
            <div className={style.solution}>
              <h4>
                <Link to="/roadmaps">Roadmaps</Link>
              </h4>
            </div>
          </div>
          <div className={style.Company_navigation}>
            <div className={style.solution}>
              <a href="#yearBook">
                <h4>Features</h4>
              </a>
            </div>
          </div>
        </div>
        <div
          className={style.Right_side_navaction_bar}
          // onClick={() => setActiveLink("Login")}
        >
          {!user ? (
            <div>
              <button className={style.navigation_Butten1}>
                <NavLink to="/Login">
                  <b>Login....</b>
                </NavLink>
              </button>
            </div>
          ) : (
            <div>
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
