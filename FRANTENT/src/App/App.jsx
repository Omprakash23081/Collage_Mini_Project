import Home from "./Home.jsx";
import { useEffect } from "react";
import style from "./App.module.css";
import Login from "../MODULES/Login/Login.jsx";
import { AppProvider } from "./AppContext.jsx";
import Navbar from "../MODULES/Home/Navbars.jsx";
import Footer from "../MODULES/Footer/Footer.jsx";
import ProfilePage from "../MODULES/Profile/PROFILE.jsx";
import { setupScrolBar } from "../JAVASCRIPT/ScrolBar.js";
import PYQPage from "../MODULES/Primum_Page3(PYQ)/PYQ.jsx";
import NotesPage from "../MODULES/NotesPage/ROOT/NOTES.jsx";
import PremiumPage from "../MODULES/WebPrimum/WebPrimum.jsx";
import Lost_Found from "../MODULES/Lost&Found/Lost_Found.jsx";
import AllPrimum from "../MODULES/Primum_Page1/AllPrimum.jsx";
import PrimiumHome from "../MODULES/Primum_Page2(Home)/PrimiumHome.jsx";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import FacultyDirectory from "../MODULES/Faculty_Directory/FacultyDirectory.jsx";

import "./index.css";

function App() {
  useEffect(() => {
    setupScrolBar();
  }, []);

  const router = createBrowserRouter([
    // "/"
    {
      path: "/",
      element: <Home />,
    },
    // "/login"
    {
      path: "/login",
      element: (
        <div className={style.App_contaniar}>
          <Navbar />
          <Login />
          <Footer />
        </div>
      ),
    },
    // "/lost-found"
    {
      path: "/lost-found",
      element: <Lost_Found />,
    },
    // "/faculty-directory"
    {
      path: "/faculty-directory",
      element: <FacultyDirectory />,
    },
    // "/primum"
    {
      path: "/primum",
      element: (
        <div className={style.Primum_contener}>
          <AllPrimum />
          <Outlet />
        </div>
      ),
      children: [
        { path: "", element: <PrimiumHome /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "notes", element: <NotesPage /> },
        { path: "pyq", element: <PYQPage /> },
        { path: "premium", element: <PremiumPage /> },
      ],
    },
  ]);

  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
