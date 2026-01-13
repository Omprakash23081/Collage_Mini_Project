import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import style from "./App.module.css";
import { setupScrolBar } from "../JAVASCRIPT/ScrolBar.js";
import ProtectedRoute from "./ProtectedRoute.jsx";

// Contexts
import { AppProvider } from "../context/AppContext.jsx";

// Components
import Navbar from "../MODULES/Home/Navbars.jsx";
import Footer from "../MODULES/Footer/Footer.jsx";

// Pages
import Home from "./Home.jsx";
import Login from "../MODULES/Login/Login.jsx";
import Lost_Found from "../MODULES/Lost&Found/Lost_Found.jsx";
import FacultyDirectory from "../MODULES/Faculty_Directory/FacultyDirectory.jsx";
import AllPrimum from "../MODULES/Primum_Page1/AllPrimum.jsx";
import PrimiumHome from "../MODULES/Primum_Page2(Home)/PrimiumHome.jsx";
import ProfilePage from "../MODULES/Profile/PROFILE.jsx";
import NotesPage from "../MODULES/NotesPage/ROOT/NOTES.jsx";
import PYQPage from "../MODULES/Primum_Page3(PYQ)/ROOT/PYQ.jsx";
import PremiumPage from "../MODULES/WebPrimum/WebPrimum.jsx";
import CareerPathways from "../MODULES/Career/CareerPathways.jsx";
import ATSAnalyzer from "../MODULES/Career/ATSAnalyzer.jsx";
import RoadmapGenerator from "../MODULES/Roadmap/RoadmapGenerator.jsx";

function PublicLayout() {
  return (
    <div className={style.App_contaniar}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

function App() {
  useEffect(() => {
    setupScrolBar();
  }, []);

  return (
    <Router>
      <AppProvider>
        <Routes>
          {/* ---------- Public Layout ---------- */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/lost-found" element={<Lost_Found />} />
            <Route path="/faculty" element={<FacultyDirectory />} />
            <Route path="/career" element={<CareerPathways />} />
            <Route
              path="/faculty-directory"
              element={<Navigate to="/faculty" />}
            />
          </Route>

          {/* ---------- Premium Routes ---------- */}
          <Route
            path="/primum"
            element={
              <ProtectedRoute>
                <AllPrimum />
              </ProtectedRoute>
            }
          >
            <Route index element={<PrimiumHome />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="notes" element={<NotesPage />} />
            <Route path="pyq" element={<PYQPage />} />
            <Route path="premium" element={<PremiumPage />} />
          </Route>

          {/* ---------- Career Tools ---------- */}
          <Route path="/career/ats-analyzer" element={<ATSAnalyzer />} />
          <Route path="/roadmaps" element={<RoadmapGenerator />} />
        </Routes>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              zIndex: 9999,
              marginTop: "5%",
              background: "white",
              color: "var(--toast-color, #111)",
              boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
              borderRadius: "8px",
              fontWeight: 500,
            },
            success: {
              iconTheme: {
                primary: "#22c938ff",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </AppProvider>
    </Router>
  );
}

export default App;
