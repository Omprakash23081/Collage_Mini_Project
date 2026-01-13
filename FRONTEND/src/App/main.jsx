import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DataProvider } from "../context/DataContext.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";

import App from "./App.jsx";
import style from "./main.module.css";
import "./App.css";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import ErrorBoundary from "../components/ErrorBoundary.jsx";

createRoot(document.getElementById("root")).render(
  <div className={style.contener}>
    <AuthProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </AuthProvider>
  </div>
);
