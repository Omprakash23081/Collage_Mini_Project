import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Layout from './layouts/Layout';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Users = lazy(() => import('./pages/Users'));
const Notes = lazy(() => import('./pages/Notes'));
const PYQ = lazy(() => import('./pages/PYQ'));
const Events = lazy(() => import('./pages/Events'));
const Faculty = lazy(() => import('./pages/Faculty'));
const Career = lazy(() => import('./pages/Career'));
const Items = lazy(() => import('./pages/Items'));
const Roadmap = lazy(() => import('./pages/Roadmap'));
const Premium = lazy(() => import('./pages/Premium'));
const Profile = lazy(() => import('./pages/Profile'));
const Banners = lazy(() => import('./pages/Banners'));
const Feedback = lazy(() => import('./pages/Feedback'));
import { Toaster } from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#f8fafc]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium animate-pulse">Loading Application...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
      <Toaster position="top-right" toastOptions={{
        style: {
          background: '#18181b',
          color: '#fff',
          border: '1px solid #27272a'
        }
      }} />
        <Suspense fallback={
          <div className="h-screen w-full flex items-center justify-center bg-[#f8fafc]">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-slate-500 font-medium animate-pulse">Loading Route...</p>
            </div>
          </div>
        }>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/banners" element={<Banners />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/pyq" element={<PYQ />} />
            <Route path="/events" element={<Events />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/career" element={<Career />} />
            <Route path="/items" element={<Items />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;
