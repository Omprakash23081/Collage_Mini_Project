class ApiError extends Error {
  constructor(
    message = "Something went wrong",
    statusCode = 500,
    errors = null,
    stack = ""
  ) {
    super(message);

    this.statusCode = statusCode;
    this.success = false; // Always false for error
    this.errors = errors; // Use plural, and allow string/object

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
