//import css from './Navbars.module.css'we can import like this and use like className= {css["variable_like_className"]}
import icon from "../PHOTO/icon.png";
import style from "./Navbars.module.css";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar({ isLogin }) {
  return (
    <>
      <div className="contener">
        <div className="left_side_navaction_bar">
          <div className="image_navigation">
            <img src={icon} alt="THE ACHIEVERS" />
            <Link to="/">
              <b>Studysharp</b>
            </Link>
          </div>
          <div className="language_navigation">
            <div className="language">
              <h2>Language</h2>
            </div>
            <div className="language_name">
              <div className="languages">
                <center>Hindi</center>
              </div>
              <div className="languages">
                <center>English</center>
              </div>
              <div className="languages">
                <center>Bengali</center>
              </div>
              <div className="languages">
                <center>Marathi</center>
              </div>
              <div className="languages">
                <center> Telugu</center>
              </div>
              <div className="languages">
                <center>Tamil</center>
              </div>
              <div className="languages">
                <center>Gujarati</center>
              </div>
              <div className="languages">
                <center> Urdu</center>
              </div>
              <div className="languages">
                <center> Kannada</center>
              </div>
              <div className="languages">
                <center> Odia</center>
              </div>
              <div className="languages">
                <center>Malayalam</center>
              </div>
            </div>
          </div>

          <div className="solutions_navigation">
            <div className="solution">
              <h4>Solution</h4>
            </div>
            <div className="box1">
              <div className="solution1">
                <div className="People_management">
                  <div className="people_Management_name">
                    <p>People Management</p>
                  </div>
                  <div className="inner_box1">
                    <div className="HR_Administration">
                      <a href="https://www.orangehrm.com/en/solutions/people-management/hr-administration/">
                        HR Administration
                      </a>
                    </div>
                    <div className="Employee_Management">
                      <a href="https://www.orangehrm.com/en/solutions/people-management/employee-management/">
                        Employee Management
                      </a>
                    </div>
                    <div className="Reporting_Analytics">
                      <a href="https://www.orangehrm.com/en/solutions/people-management/reporting-and-analytics/">
                        Reporting & Analytics
                      </a>
                    </div>
                    <div className="Mobile_App">
                      <a href="https://www.orangehrm.com/en/solutions/people-management/orangehrm-mobile-app/">
                        Mobile App
                      </a>
                    </div>
                  </div>
                </div>
                <div className="talent_management">
                  <div className="People_management">
                    <div className="people_Management_name">
                      <p>Talent Management</p>
                    </div>
                    <div className="inner_box2">
                      <div className="HR_Administration">
                        <a href="https://www.orangehrm.com/en/solutions/people-management/hr-administration/">
                          Recruitment (ATS)
                        </a>
                      </div>
                      <div className="Employee_Management">
                        <a href="https://www.orangehrm.com/en/solutions/people-management/employee-management/">
                          On/Off-Boarding
                        </a>
                      </div>
                      <div className="Reporting_Analytics">
                        <a href="https://www.orangehrm.com/en/solutions/people-management/reporting-and-analytics/">
                          Request Desk
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="compensation">
                  <div className="People_management">
                    <div className="people_Management_name">
                      <p>Compatatiom</p>
                    </div>
                    <div className="inner_box2">
                      <div className="HR_Administration">
                        <a href="https://www.orangehrm.com/en/solutions/people-management/hr-administration/">
                          Payroll Connector
                        </a>
                      </div>
                      <div className="Employee_Management">
                        <a href="https://www.orangehrm.com/en/solutions/people-management/employee-management/">
                          PTO / Leave Management
                        </a>
                      </div>
                      <div className="Reporting_Analytics">
                        <a href="https://www.orangehrm.com/en/solutions/people-management/reporting-and-analytics/">
                          Time Tracking
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="culture">
                  <div className="People_management">
                    <div className="people_Management_name">
                      <p>Culture</p>
                    </div>
                    <div className="inner_box2">
                      <div className="HR_Administration">
                        <a href="https://www.orangehrm.com/en/solutions/people-management/hr-administration/">
                          Performance Management
                        </a>
                      </div>
                      <div className="Employee_Management">
                        <a href="https://www.orangehrm.com/en/solutions/people-management/employee-management/">
                          Career Development
                        </a>
                      </div>
                      <div className="Reporting_Analytics">
                        <a href="https://www.orangehrm.com/en/solutions/people-management/reporting-and-analytics/">
                          Training
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="solutions_navigation" id="Why_orange_hrm_navigation">
            <div className="solution">
              <h4>Problem Sender</h4>
            </div>
            <div className="box2">
              <div className="solution1">
                <div className="People_management">
                  <div className="people_Management_name">
                    <p>Our Customers</p>
                  </div>
                  <div className="inner_box1">
                    <div className="HR_Administration">
                      <a href="https://www.orangehrm.com/en/solutions/people-management/hr-administration/">
                        Case Studies
                      </a>
                    </div>
                    <div className="Employee_Management">
                      <a href="https://www.orangehrm.com/en/solutions/people-management/employee-management/">
                        Testimonials
                      </a>
                    </div>
                  </div>
                </div>
                <div className="talent_management">
                  <div className="People_management">
                    <div className="people_Management_name">
                      <p>Partners</p>
                    </div>
                    <div className="inner_box2">
                      <div className="HR_Administration">
                        <a href="https://www.orangehrm.com/en/solutions/people-management/hr-administration/">
                          NGO's
                        </a>
                      </div>
                      <div className="Employee_Management">
                        <a href="https://www.orangehrm.com/en/solutions/people-management/employee-management/">
                          Grovemment
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="compensation">
                  <div className="People_management">
                    <div className="people_Management_name">
                      <p>Stakeholder Solutions</p>
                    </div>
                    <div className="inner_box2">
                      <div className="HR_Administration">
                        <a href="https://www.orangehrm.com/en/solutions/people-management/hr-administration/">
                          HR Manager
                        </a>
                      </div>
                      <div className="Employee_Management">
                        <a href="https://www.orangehrm.com/en/solutions/people-management/employee-management/">
                          C-Suite
                        </a>
                      </div>
                      <div className="Reporting_Analytics">
                        <a href="https://www.orangehrm.com/en/solutions/people-management/reporting-and-analytics/">
                          Recruiter
                        </a>
                      </div>
                      <div className="Reporting_Analytics">
                        <a href="https://www.orangehrm.com/en/solutions/people-management/reporting-and-analytics/">
                          It Manager
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="culture">
                  <div className="People_management">
                    <div className="people_Management_name">
                      <p>Switch to OrangeHRM</p>
                    </div>
                    <div className="inner_box2">
                      <div className="HR_Administration">
                        <a href="https://www.orangehrm.com/en/solutions/people-management/hr-administration/">
                          HR for All
                        </a>
                      </div>
                      <div className="Employee_Management">
                        <a href="https://www.orangehrm.com/en/solutions/people-management/employee-management/">
                          CS & Support
                        </a>
                      </div>
                      <div className="Reporting_Analytics">
                        <a href="https://www.orangehrm.com/en/solutions/people-management/reporting-and-analytics/">
                          Customizations
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="culture">
                  <div className="People_management">
                    <div className="people_Management_name">
                      <p>Culture</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Resource_navigation">
            <div className="solution">
              <h4>
                <a href="/#hellow">Roadmaps</a>
              </h4>
            </div>
          </div>
          <div className="Company_navigation">
            <div className="solution">
              <a href="#hellow">
                <h4>Features</h4>
              </a>
            </div>
          </div>
        </div>
        <div
          className="Right_side_navaction_bar"
          // onClick={() => setActiveLink("Login")}
        >
          <div>
            {!isLogin ? (
              <button className="navigation_Butten1">
                <NavLink to="/Login">
                  <b>Login....</b>
                </NavLink>
              </button>
            ) : (
              <p>o o</p>
            )}
          </div>
          <div>
            <div className="navigation_Butten2">
              <input type="search" placeholder="Search..." />
            </div>
            <div className="butten">
              <button>Search</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
