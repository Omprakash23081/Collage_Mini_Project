import React, { useState, useContext } from "react";
import { Navigate } from "react-router";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Content from "./pages/Content";
import Analytics from "./pages/Analytics";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import { AppContext } from "./AppContext.jsx";
import Login from "./components/Login/Login.jsx";
import RefrshHandler from "./RefrshHandler.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { isLogin } = useContext(AppContext);
  const { loading } = useContext(AppContext);

  // const router = createBrowserRouter([
  //   {
  //     path: "/login",
  //     element: <Login />,
  //   },
  //   {
  //     path: "/",
  //     element: (
  //       <>
  //         <Dashboard />
  //         <Outlet />
  //       </>
  //     ),
  //     children: [
  //       { path: "", element: <PrimiumHome /> },
  //       { path: "profile", element: <ProfilePage /> },
  //       { path: "notes", element: <NotesPage /> },
  //       { path: "pyq", element: <PYQPage /> },
  //       { path: "premium", element: <PremiumPage /> },
  //     ],
  //   },
  // ]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 flex">
        {isLogin && (
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}

        <div className="flex-1 flex flex-col">
          {isLogin && <Header onMenuClick={() => setSidebarOpen(true)} />}

          <main className="flex-1">
            <RefrshHandler />
            <Routes>
              <Route
                path="/login"
                element={isLogin ? <Navigate to="/" /> : <Login />}
              />

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <ProtectedRoute>
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/content"
                element={
                  <ProtectedRoute>
                    <Content />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/messages"
                element={
                  // <ProtectedRoute>
                  <Messages />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;

// if (loading) {
//   return (
//     <>
//       <div className="flex items-center justify-center min-h-screen bg-gray-900">
//         <div className="text-white text-2xl">Loading...</div>
//       </div>
//     </>
//   );
// }
