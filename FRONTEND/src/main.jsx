import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GlobalProvider } from "./context/GlobalContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./theme.css";

import App from "./App.jsx";
import style from "./main.module.css";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import ErrorBoundary from "../components/ErrorBoundary.jsx";

createRoot(document.getElementById("root")).render(
  <div className={style.contener}>
    <AuthProvider>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </AuthProvider>
  </div>
);
