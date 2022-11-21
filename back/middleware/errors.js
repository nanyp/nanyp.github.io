const ErrorHandler = require('../utils/errorHandler')

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error"

    res.status(err.statusCode).json({
        success: false,
        message: err.stack
    })

    //Duplicate key error in mongoose
    if (err.code === 11000) {
        const message = `Duplicate key ${Object.keys(err.keyValue)}`
        error = new ErrorHandler(message, 400)
    }

    //JWT token error
    if (err.name === "JsonWebTokenError") {
        const message = "Json web token is invalid, try again."
        error = new ErrorHandler(message, 400)
    }

    //JWT token expired
    if (err.name === "TokenExpiredError") {
        const message = "JWT token expired, request new token, try again."
        error = new ErrorHandler(message, 400)
    }
}