import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AppProvider } from "./AppContext.jsx";
// import RefreshHandler from "./RefrshHandler.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProvider>
    {/* <RefreshHandler /> */}
    <App />
  </AppProvider>
);
