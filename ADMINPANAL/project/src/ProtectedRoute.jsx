// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./AppContext";

function ProtectedRoute({ children }) {
  const { isLogin } = useContext(AppContext);
  console.log("in protection section ", isLogin);
  return isLogin ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
