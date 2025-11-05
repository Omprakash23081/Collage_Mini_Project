import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import SubjectsPage from "./pages/SubjectsPage";
import ChaptersPage from "./pages/ChaptersPage";
import NotesPage from "./pages/NotesPage";
import PYQPage from "./pages/PYQPage";
import HackathonsPage from "./pages/HackathonsPage";
import LostFoundPage from "./pages/LostFoundPage";
import FacultyPage from "./pages/FacultyPage";
import FeedbackPage from "./pages/FeedbackPage";
import UsersPage from "./pages/UsersPage";
import { Toaster } from "react-hot-toast";
import RefreshHandler from "./RefreshHandler.jsx";

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <RefreshHandler />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/subjects"
              element={
                <ProtectedRoute>
                  <SubjectsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/subjects/:subjectId/chapters"
              element={
                <ProtectedRoute>
                  <ChaptersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/notes"
              element={
                <ProtectedRoute>
                  <NotesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/pyq"
              element={
                <ProtectedRoute>
                  <PYQPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/hackathons"
              element={
                <ProtectedRoute>
                  <HackathonsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/lost-found"
              element={
                <ProtectedRoute>
                  <LostFoundPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/faculty"
              element={
                <ProtectedRoute>
                  <FacultyPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/feedback"
              element={
                <ProtectedRoute>
                  <FeedbackPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requiredRole="SuperAdmin">
                  <UsersPage />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/admin/dashboard" />} />
          </Routes>
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
  );
}

export default App;
