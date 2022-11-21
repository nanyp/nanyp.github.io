const nodemailer = require("nodemailer")

const sendEmail = async options => {
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "84fb89391f8957",
            pass: "9742b493633e34"
        }
    });
    const message = {
        from: "HotWhells E-Commerce <soport@hw.com.co>",
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transport.sendMail(message)
}

module.exports = sendEmail;