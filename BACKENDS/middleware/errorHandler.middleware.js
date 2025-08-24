import ApiError from "../util/ApiErrer.js";

const errorHandler = (err, req, res, next) => {
  console.error(err); // For debugging

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      errors: err.errors || null,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }

  // Fallback for unexpected errors
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    errors: err.message,
  });
};

export default errorHandler;
