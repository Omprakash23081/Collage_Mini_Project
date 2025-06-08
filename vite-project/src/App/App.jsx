import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import axios from "axios";
import style from "./App.module.css";
import { setupScrolBar } from "../JAVASCRIPT/ScrolBar.js";
import Home from "./Home.jsx";
import Login from "../MODULES/Login/Login.jsx";
import Navbar from "../MODULES/Home/Navbars.jsx";
import Footer from "../MODULES/Footer/Footer.jsx";
import AllPrimum from "../MODULES/Primum_Page1/AllPrimum.jsx";
import ProfilePage from "../MODULES/Profile/PROFILE.jsx";
import PYQPage from "../MODULES/Primum_Page3(PYQ)/PYQ.jsx";
import PremiumPage from "../MODULES/WebPrimum/WebPrimum.jsx";
import Lost_Found from "../MODULES/Lost&Found/Lost_Found.jsx";
import PrimiumHome from "../MODULES/Primum_Page2(Home)/PrimiumHome.jsx";
import FacultyDirectory from "../MODULES/Faculty_Directory/FacultyDirectory.jsx";

function App() {
  const [currentPrimum, setPrimum] = useState(false);
  const [currentmanu, setManu] = useState("Home");

  useEffect(() => {
    setupScrolBar();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setTimeout(async () => {
      try {
        const response = await axios.get("/Login", {
          signal: controller.signal,
        });
        console.log(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log(`Error during abort signal: ${error.message}`);
        } else {
          console.error("Error fetching data:", error);
        }
      }
    }, 3000);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home
          currentPrimum={currentPrimum}
          SetPrimums={() => setPrimum(true)}
        />
      ),
    },
    {
      path: "/Login",
      element: (
        <div className={style.App_contaniar}>
          <Navbar />
          <Login />
          <Footer />
        </div>
      ),
    },
    {
      path: "/Lost_Found",
      element: <Lost_Found />,
    },
    {
      path: "/Faculty&Directory",
      element: <FacultyDirectory />,
    },
    {
      path: "/Primum",
      element: (
        <div className={style.Primum_contener}>
          <AllPrimum currentmanu={currentmanu} SetSidebar={setManu} />
          <Outlet />
        </div>
      ),
      children: [
        {
          path: "",
          element: <PrimiumHome />,
        },
        {
          path: "Profile",
          element: <ProfilePage />,
        },
        {
          path: "PYQ",
          element: <PYQPage />,
        },
        {
          path: "Premium",
          element: <PremiumPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
