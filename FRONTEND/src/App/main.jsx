import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DataProvider } from "../context/DataContext.jsx";

import App from "./App.jsx";
import style from "./main.module.css";
import "./App.css";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import ErrorBoundary from "../components/ErrorBoundary.jsx";

createRoot(document.getElementById("root")).render(
  <div className={style.contener}>
    <DataProvider>
      <App />
    </DataProvider>
  </div>
);
