import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import logger from "./utils/logger.js";
import errorHandler from "./middleware/errorHandler.middleware.js";
import { ApiError } from "./utils/ApiError.js";
import express from "express";

const app = express();

app.set("trust proxy", 1);

app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "res.cloudinary.com", "*.cloudinary.com"],
        connectSrc: [
          "'self'",
          "http://localhost:*",
          "https://studysharps.vercel.app",
          "https://studysharp.netlify.app",
          "https://studysharp.in",
          "https://www.studysharp.in",
        ],
      },
    },
  }),
);

/* =========================
   LOGGER (Morgan Hooks into Winston)
========================= */
const morganFormat =
  ":method :url :status :res[content-length] - :response-time ms";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
    skip: (req) => req.url === "/health",
  }),
);

/* =========================
   HEALTH CHECK
========================= */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.use(
  cors({
    origin: [
      "https://studysharps.vercel.app/",
      "https://studysharp.netlify.app/",
      "https://studysharps.vercel.app",
      "https://studysharp.netlify.app",
      "https://studysharp.in",
      "https://www.studysharp.in",
      "https://sspadminpanal.netlify.app",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    credentials: true,
  }),
);

/* =========================
   BODY PARSERS
========================= */
app.use(express.json({ limit: "15kb" }));
app.use(express.urlencoded({ extended: true, limit: "15kb" }));
app.use(cookieParser());
app.use(express.static("public"));

/* =========================
   RATE LIMIT (API ONLY)
========================= */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(options.statusCode).json({
      success: false,
      message: options.message,
    });
  },
  message: "Too many requests, try again later",
});

app.use("/api", limiter);

/* =========================
   ROUTES
========================= */
import rootRouter from "./routes/index.js";
app.use("/api", rootRouter);

/* =========================
   404 HANDLER
========================= */
app.use((req, res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

/* =========================
   ERROR PIPELINE
========================= */
app.use(errorHandler);

export default app;
