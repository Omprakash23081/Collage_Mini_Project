import logger from "../utils/logger.js";
import { ApiError } from "../utils/ApiError.js";

export default function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  
  const errorMetadata = {
    statusCode,
    path: req.path,
    method: req.method,
    ip: req.ip,
    userAgent: req.get("user-agent"),
    stack: process.env.NODE_ENV !== "production" ? err.stack : undefined,
  };

  if (err instanceof ApiError) {
    logger.warn(`API Error: ${message}`, errorMetadata);
  } else {
    logger.error(`Unhandled Error: ${message}`, errorMetadata);
  }

  return res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
}
