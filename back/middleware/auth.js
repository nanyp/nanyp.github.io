const User = require("../models/auth")
const jwt = require("jsonwebtoken")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")

//Verify authenticated yes or no --> (exist and validate the authenticity of the token)
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies

    if (!token) {
        return next(new ErrorHandler("Login to access", 401))
    }

    const decode = jwt.decode(token, process.env.JWT_SECRET)
    req.user = await User.findById(decode.id);

    next()

})

//Catch the role
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Rol (${req.user.role}) Access denied`, 403))
        }
        next()
    }
}