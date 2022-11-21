//Create and send a token saved in a cookie
const tokenSend = (user, statusCode, res) => {

    //Create a token 
    const token = user.getJwtToken();

    //Token options
    const tokenOptions = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res.status(statusCode).cookie("token", token, tokenOptions).json({
        success: true,
        token,
        user
    })
}

module.exports = tokenSend;