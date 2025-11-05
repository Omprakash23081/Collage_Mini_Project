import App from "./App.jsx";
import { StrictMode } from "react";
import style from "./main.module.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <div className={style.contener}>
    <App></App>
  </div>
  // </StrictMode>
);
