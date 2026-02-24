module.exports = (err, req, res, next) => {
    // 1. Determine the status code
    const statusCode = err.statusCode || 500;

    // 2. Determine the message (don't hardcode it!)
    const message = err.message || 'Internal Server Error';

    // 3. Send the response
    res.status(statusCode).json({
        success: false,
        message: message, // Now it will say "Task not found" instead of "Internal Server Error"
        // Optional: include the stack trace only in development mode
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });

    // DO NOT call next() here. The buck stops here!
};