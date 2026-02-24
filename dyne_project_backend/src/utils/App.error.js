// creating using class
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.success = false;

        // This captures the stack trace so you know where the error happened
        Error.captureStackTrace(this, this.constructor)
    }
}