import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
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
import NotesPage from "../MODULES/NotesPage/ROOT/NOTES.jsx";
import PrimiumHome from "../MODULES/Primum_Page2(Home)/PrimiumHome.jsx";
import FacultyDirectory from "../MODULES/Faculty_Directory/FacultyDirectory.jsx";

function App() {
  const [currentPrimum, setPrimum] = useState(false);
  const [currentmanu, setManu] = useState("Home");
  const [isLogin, setIsLogin] = useState(false);

  function handleLogin() {
    setIsLogin(true);
  }

  useEffect(() => {
    setupScrolBar();
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
          <Navbar isLogin={isLogin} />
          <Login handleLogin={handleLogin} />
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
          path: "Notes",
          element: <NotesPage />,
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
