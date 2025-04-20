//to create a new react boiler plate use rfce
import Home from "./Home.jsx";
import { useState } from "react";
import { useEffect } from "react";
import style from "./App.module.css";
import Login from "../MODULES/Login/Login.jsx";
import Navbar from "../MODULES/Home/Navbars.jsx";
import Footer from "../MODULES/Footer/Footer.jsx";
import Lost_Found from "../MODULES/Lost&Found/Lost_Found.jsx";
import FacultyDirectory from "../MODULES/Faculty_Directory/FacultyDirectory.jsx";
import Primum from "../MODULES/Primum_Page1/Primum.jsx";
import { setupScrolBar } from "../JAVASCRIPT/ScrolBar.js";
import AllPrimum from "../MODULES/Primum_Page1/AllPrimum.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";

function App() {
  // Fetch data from the API
  // useEffect(() => {
  //   const controller = new AbortController();
  //   setTimeout(async () => {
  //     await axios
  //       .get("/Login", {
  //         signal: controller.signal,
  //       })
  //       .then((response) => {
  //         console.log(response.data);
  //       })
  //       .catch((error) => {
  //         if (axios.isCancel(error)) {
  //           console.log(`Errer during abort signal ${error.message}`);
  //         }
  //         console.error("Error fetching data:", error);
  //       });
  //   }, 3000);
  // }, []);

  // let [logins, setLogin] = useState(false);
  let [currentPrimum, SetPrimum] = useState(false);
  let [currentmanu, Setmanu] = useState("Home");

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Home currentPrimum={currentPrimum} SetPrimums={SetPrimums} />
        </>
      ),
    },
    {
      path: "/Login",
      element: (
        <>
          <div className={style.App_contaniar}>
            <Navbar />
            <Login />
            <Footer />
          </div>
        </>
      ),
    },

    {
      path: "/Lost&Found",
      element: (
        <>
          <Lost_Found />
        </>
      ),
    },

    {
      path: "/Faculty&Directory",
      element: (
        <>
          <FacultyDirectory />
        </>
      ),
    },

    {
      path: "/Primum",
      element: (
        <>
          <h1>Still I m woking comming soon .. </h1>
          {/* <div className={style.Primum_contener}>
            <AllPrimum currentmanu={currentmanu} SetSidebar={SetSidebar} />
            <Primum currentmanu={currentmanu} />
          </div> */}
        </>
      ),
    },
  ]);

  function Render() {
    setLogin(true);
  }

  function SetPrimums() {
    SetPrimum(true);
  }

  function SetSidebar(value) {
    Setmanu(value);
  }

  useEffect(() => {
    setupScrolBar();
  }, []);

  return (
    <>
      <RouterProvider router={router} />

      {/* {currentPrimum && (
        <div className={style.Primum_contener}>
          <AllPrimum currentmanu={currentmanu} SetSidebar={SetSidebar} />
          <Primum currentmanu={currentmanu} />
        </div>
      )} */}

      {/* {!currentPrimum && (
        <Home
          currentPrimum={currentPrimum}
          SetPrimums={SetPrimums}
          logins={logins}
          Render={Render}
        />
      )} */}
    </>
  );
}

export default App;
