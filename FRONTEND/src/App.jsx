import { useEffect, useRef, lazy, Suspense } from "react";
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

const Login = lazy(() => import("./pages/Login/Login.jsx"));
const LostFound = lazy(() => import("./pages/LostFound/Lost_Found.jsx"));
const FacultyDirectory = lazy(() => import("./pages/FacultyDirectory/FacultyDirectory.jsx"));
const AllPrimum = lazy(() => import("./pages/PremiumLanding/AllPrimum.jsx"));
const PrimiumHome = lazy(() => import("./pages/PremiumDashboard/PrimiumHome.jsx"));
const ProfilePage = lazy(() => import("./pages/Profile/Profile.jsx"));
const NotesPage = lazy(() => import("./pages/Notes/ROOT/Notes.jsx"));
const PYQPage = lazy(() => import("./pages/PYQHub/ROOT/PYQ.jsx"));
const PremiumPage = lazy(() => import("./pages/PremiumPlans/WebPrimum.jsx"));
const CareerPathways = lazy(() => import("./pages/Career/CareerPathways.jsx"));
const ATSAnalyzer = lazy(() => import("./pages/Career/ATSAnalyzer.jsx"));
const RoadmapGenerator = lazy(() => import("./pages/Roadmap/RoadmapGenerator.jsx"));
const CanteenDashboard = lazy(() => import("./pages/Vendor/CanteenDashboard.jsx"));
const StationeryDashboard = lazy(() => import("./pages/Vendor/StationeryDashboard.jsx"));
const CanteenStore = lazy(() => import("./pages/Store/CanteenStore.jsx"));
const PrintSpooler = lazy(() => import("./pages/Store/PrintSpooler.jsx"));

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
      <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'gray', backgroundColor: '#0f0f13' }}>Loading...</div>}>
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
      </Suspense>
    </Router>
  );
}

export default App;
