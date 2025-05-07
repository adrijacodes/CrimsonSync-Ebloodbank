class ApiError extends Error {
  constructor(status = 500, message = "Internal Server Error", stack = "") {
    super(message);
    this.message = message;

    this.success = false;
    this.status = status;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
