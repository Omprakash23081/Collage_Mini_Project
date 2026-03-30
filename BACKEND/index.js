import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import http from "http";
import { initSocket } from "./src/utils/socket.js";

dotenv.config({ path: "./.env" });

const port = process.env.PORT || 3000;
const server = http.createServer(app);

// Initialize Socket.io
initSocket(server);

/* =========================
   DB + SERVER START
========================= */
connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Server startup failed:", error);
  });

console.log("Server logic refreshed...");
