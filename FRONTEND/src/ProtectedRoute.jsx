import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx";
const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    console.warn(`Access denied for role: ${user.role}. Required: ${roles}`);
    return <Navigate to="/" replace />;
  }

  if (user.role === 'student' && !user.year) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
