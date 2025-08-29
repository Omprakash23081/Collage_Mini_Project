import express from "express";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: [
      "https://hellowduniya.netlify.app",
      "http://localhost:5174",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
export default app;
