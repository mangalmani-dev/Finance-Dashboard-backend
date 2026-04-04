
// A CUSTOM ERROR CLASS TO STANDARDIZE ERROR RESPONSES THROUGHOUT THE APPLICATION

class ApiError extends Error {
  constructor(
    statusCode = 500,
    message = "Internal Server Error",
    errors = [],
    stack = ""
  ) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.success = false;
    this.data = null;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;