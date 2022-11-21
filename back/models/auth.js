const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please, imput your name"],
        maxlength: [120, "Name cannot exceed 120 characters"]
    },
    email: {
        type: String,
        required: [true, "Please, input your email"],
        unique: true,
        validate: [validator.isEmail, "Please, input a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please, input a password"],
        minlength: [8, "Password requires a minimum of 8 characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

//Encrypt password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//Crack passwords and compare
userSchema.methods.comparePassword = async function (currentPassword) {
    return await bcrypt.compare(currentPassword, this.password)
}

//Return a JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

//Generate a password reset token
userSchema.methods.genResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex')

    //Hash and set reset token
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex')

    //Set token expiration time - valid next 5 minutes
    this.resetPasswordExpire = Date.now() + 5 * 60 * 1000

    return resetToken
}

module.exports = mongoose.model("auth", userSchema)






