import { useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import style from "./App.module.css";
import { setupScrolBar } from "./utils/ScrolBar.js";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { authService } from "./services/authService.js";

// Components
import Navbar from "./components/common/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";

// Pages
import RoleSelection from "./pages/RoleSelection/RoleSelection.jsx";
import Home from "./Home.jsx";
import Login from "./pages/Login/Login.jsx";
import LostFound from "./pages/LostFound/Lost_Found.jsx";
import FacultyDirectory from "./pages/FacultyDirectory/FacultyDirectory.jsx";
import AllPrimum from "./pages/PremiumLanding/AllPrimum.jsx";
import PrimiumHome from "./pages/PremiumDashboard/PrimiumHome.jsx";
import ProfilePage from "./pages/Profile/Profile.jsx";
import NotesPage from "./pages/Notes/ROOT/Notes.jsx";
import PYQPage from "./pages/PYQHub/ROOT/PYQ.jsx";
import PremiumPage from "./pages/PremiumPlans/WebPrimum.jsx";
import CareerPathways from "./pages/Career/CareerPathways.jsx";
import ATSAnalyzer from "./pages/Career/ATSAnalyzer.jsx";
import RoadmapGenerator from "./pages/Roadmap/RoadmapGenerator.jsx";
import CanteenDashboard from "./pages/Vendor/CanteenDashboard.jsx";
import StationeryDashboard from "./pages/Vendor/StationeryDashboard.jsx";
import CanteenStore from "./pages/Store/CanteenStore.jsx";
import PrintSpooler from "./pages/Store/PrintSpooler.jsx";

function LocationTracker() {
  const location = useLocation();
  const currentPath = useRef(location.pathname);

  useEffect(() => {
    currentPath.current = location.pathname;
  }, [location]);

  useEffect(() => {
    const handleUnload = () => {
      const path = currentPath.current;
      if (path !== "/login" && path !== "/" && path !== "/home") {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
        fetch(`${apiUrl}/api/auth/save-location`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: path }),
          keepalive: true,
          credentials: "include",
        }).catch(console.error);
      }
    };
    
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return null;
}

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
      <LocationTracker />
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* ---------- Role Selection & Landing ---------- */}
        <Route path="/" element={<RoleSelection />} />
        
        {/* ---------- Public Layout ---------- */}
        <Route element={<PublicLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/welcome" element={<Navigate to="/home" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/lost-found" element={<LostFound />} />
          <Route path="/faculty" element={<FacultyDirectory />} />
          <Route path="/career" element={<CareerPathways />} />
          <Route
            path="/faculty-directory"
            element={<Navigate to="/faculty" />}
          />
        </Route>

        {/* ---------- Role-Specific Dashboards ---------- */}
        <Route path="/student" element={<Navigate to="/primum" />} />
        
        <Route 
          path="/canteen" 
          element={
            <ProtectedRoute roles={['canteen_vendor', 'admin']}>
              <CanteenDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/stationery" 
          element={
            <ProtectedRoute roles={['stationery_vendor', 'admin']}>
              <StationeryDashboard />
            </ProtectedRoute>
          } 
        />

        {/* ---------- Premium Routes (Student Portal) ---------- */}
        <Route
          path="/primum"
          element={
            <ProtectedRoute roles={['student', 'admin']}>
              <AllPrimum />
            </ProtectedRoute>
          }
        >
          <Route index element={<PrimiumHome />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="notes/:subjectName?" element={<NotesPage />} />
          <Route path="pyq/:subjectName?" element={<PYQPage />} />
          <Route path="canteen" element={<CanteenStore />} />
          <Route path="print" element={<PrintSpooler />} />
          <Route path="premium" element={<PremiumPage />} />
        </Route>

        {/* ---------- Career Tools ---------- */}
        <Route path="/career/ats-analyzer" element={<ATSAnalyzer />} />
        <Route path="/roadmaps" element={<RoadmapGenerator />} />
      </Routes>
    </Router>
  );
}

export default App;
