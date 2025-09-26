import express from "express";
import cors from "cors";
import cookiesParser from "cookie-parser";
const app = express();
app.use(
  cors({
    origin: [
      "https://hellowduniya.netlify.app",
      "http://localhost:5174",
      "http://localhost:5173",
      "https://collage-mini-project-090y.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookiesParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
export default app;
