import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import root from "./src/routes/index.js";

dotenv.config({ path: "./.env" });

const port = process.env.PORT || 3000;

/* =========================
   ROUTES (BEFORE SERVER)
========================= */
app.use("/api", root);

/* =========================
   DB + SERVER START
========================= */
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Server startup failed:", error);
  });

console.log("Server logic refreshed...");
