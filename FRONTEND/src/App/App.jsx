import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import style from "./App.module.css";
import { setupScrolBar } from "../JAVASCRIPT/ScrolBar.js";

//  Contexts
import { AppProvider } from "../context/AppContext.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import { DataProvider } from "../context/DataContext.jsx";

//  Components
import Navbar from "../MODULES/Home/Navbars.jsx";
import Footer from "../MODULES/Footer/Footer.jsx";
import RefreshHandler from "./RefreshHandler.jsx";

//  Pages
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

//  Protected routes and dashboard pages
// import ProtectedRoute from "../ProtectedRoute.jsx";
// import Profile from "../MODULES/Profile/PROFILE.jsx";
// import NotesList from "../MODULES/NotesPage/ROOT/NOTES.jsx";
// import PYQList from "../MODULES/Primum_Page3(PYQ)/PYQ.jsx";
// import Dashboard from "../MODULES/Dashboard/Dashboard.jsx";
// import UploadNote from "../MODULES/NotesPage/UploadNote.jsx";
// import UploadPYQ from "../MODULES/Primum_Page3(PYQ)/UploadPYQ.jsx";
// import EventsList from "../MODULES/Events/EventsList.jsx";
// import LostFoundList from "../MODULES/Lost&Found/LostFoundList.jsx";
import CareerPathways from "../MODULES/Career/CareerPathways.jsx";
import ATSAnalyzer from "../MODULES/Career/ATSAnalyzer.jsx";
import RoadmapGenerator from "../MODULES/Roadmap/RoadmapGenerator.jsx";

function App() {
  useEffect(() => {
    setupScrolBar();
  }, []);

  return (
    <AppProvider>
      <AuthProvider>
        <DataProvider>
          <Router>
            <RefreshHandler />
            <Routes>
              {/* ---------- Public Routes ---------- */}
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={
                  <div className={style.App_contaniar}>
                    <Navbar />
                    <Login />
                    <Footer />
                  </div>
                }
              />
              <Route path="/lost-found" element={<Lost_Found />} />
              <Route path="/faculty-directory" element={<FacultyDirectory />} />

              {/* ---------- Premium Pages ---------- */}
              <Route
                path="/primum"
                element={
                  <div className={style.Primum_contener}>
                    <AllPrimum />
                  </div>
                }
              >
                <Route path="" element={<PrimiumHome />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="notes" element={<NotesPage />} />
                <Route path="pyq" element={<PYQPage />} />
                <Route path="premium" element={<PremiumPage />} />
              </Route>

              {/* ---------- Protected Routes ---------- */}
              {/* <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              /> */}

              {/* <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/notes"
                element={
                  <ProtectedRoute>
                    <NotesList />
                  </ProtectedRoute>
                }
              /> */}

              {/* <Route
                path="/notes/upload"
                element={
                  <ProtectedRoute allowedRoles={["faculty", "admin"]}>
                    <UploadNote />
                  </ProtectedRoute>
                }
              /> */}

              {/* <Route
                path="/pyq"
                element={
                  <ProtectedRoute>
                    <PYQList />
                  </ProtectedRoute>
                }
              /> */}

              {/* <Route
                path="/pyq/upload"
                element={
                  <ProtectedRoute allowedRoles={["faculty", "admin"]}>
                    <UploadPYQ />
                  </ProtectedRoute>
                }
              /> */}

              {/* <Route path="/events" element={<EventsList />} /> */}
              <Route path="/faculty" element={<FacultyDirectory />} />

              {/* <Route
                path="/lost-found"
                element={
                  <ProtectedRoute>
                    <LostFoundList />
                  </ProtectedRoute>
                }
              /> */}

              <Route path="/career" element={<CareerPathways />} />
              <Route path="/career/ats-analyzer" element={<ATSAnalyzer />} />
              <Route path="/roadmaps" element={<RoadmapGenerator />} />
            </Routes>

            {/* ---------- Toaster ---------- */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  zIndex: 9999999999,
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
          </Router>
        </DataProvider>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;
