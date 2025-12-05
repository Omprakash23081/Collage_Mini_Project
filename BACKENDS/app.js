//in this file we will configure our express app with all the middlewares required

import express from "express";
import cors from "cors";
import cookiesParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler.middleware.js";
const app = express();

app.use(
  // Enable CORS for specified origins
  cors({
    origin: [
      "https://hellowduniya.netlify.app",
      "http://localhost:5174",
      "http://localhost:5173",
      "https://collage-mini-project-090y.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    // Allow credentials such as cookies to be sent
    credentials: true,
  })
);
// Using error handling middleware
// Middleware to parse JSON and URL-encoded data, and cookies
app.use(express.json());
// Middleware to parse cookies
app.use(cookiesParser());
// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));
// Serving static files from the "public" directory
app.use(express.static("public"));
app.use(errorHandler);
export default app;
