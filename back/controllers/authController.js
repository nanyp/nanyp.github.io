const User = require("../models/auth")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const sendEmail = require("../utils/sendEmail")
const tokenSend = require("../utils/jwtToken");
const crypto = require("crypto")
const cloudinary = require("cloudinary")

// Register a new user --> /api/user/register
exports.userRegister = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 240,
        crop: "scale"
    })

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    })

    tokenSend(user, 201, res)
})

// =================================================================================================

// Sing In --> Login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // Validate that the field requirement is met
    if (!email || !password) {
        return next(new ErrorHandler("Please, input email and password", 400))
    }

    //Validate that the user exists in the database
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    //Compare passwords, validate that they are correct
    const passwordOK = await user.comparePassword(password);

    if (!passwordOK) {
        return next(new ErrorHandler("Invalid password", 401))
    }

    tokenSend(user, 200, res)
})

// =================================================================================================

// Sing Up --> Logout
exports.logOut = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Session ended"
    })
})

// =================================================================================================

// Forgotten password - Recover password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User is not registered", 404))
    }
    const resetToken = user.genResetPasswordToken();

    await user.save({ validateBeforeSave: false })

    // Create a URL to reset the password
    const resetUrl = `${req.protocol}://${req.get("host")}/api/resetPassword/${resetToken}`;

    const message = `Hi!\n\nThe link to recover your access password is as follows: \n\n${resetUrl}\n\n
    
    If it wasn't you, please contact soport@hw.com.co`

    try {
        await sendEmail({
            email: user.email,
            subject: "Hotwhells password recovery",
            message
        })
        res.status(200).json({
            success: true,
            message: `Email send to: ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500))
    }
})

// =================================================================================================

// Reset the password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    // Hash token received with the URl
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

    // Find user to set password
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    // Validate that the user exists in the database
    if (!user) {
        return next(new ErrorHandler("Invalid or expired token", 400))
    }

    // Validate password field match
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Passwords do not match", 400))
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    tokenSend(user, 200, res)
})

// =================================================================================================

// View user profile --> Auth Admin
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

// =================================================================================================

// Update password --> Registered user
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    // Check if the old password is the same as the new one
    const samePassword = await user.comparePassword(req.body.oldPassword)

    if (!samePassword) {
        return next(new ErrorHandler("Wrong current password, must be different from the current one", 401))
    }

    user.password = req.body.newPassword;
    await user.save();

    tokenSend(user, 200, res)
})

// =================================================================================================

// Update the registered user profile by modifying the email
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    // Update Avatar --> To do

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})

// ==================================================================================================
// ===============================/ Services controlled only by Admin \==============================

// View all users --> Auth Admin
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

// ==================================================================================================

// View user information --> Auth Admin
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User with id: ${req.params.id} not found`))
    }

    res.status(200).json({
        success: true,
        user
    })
})

// ==================================================================================================

// Update user register --> Auth Admin
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.rol
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})

// ==================================================================================================

// Delete user register --> Auth Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User with id: ${req.params.id} is not in our database`))
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    })
})