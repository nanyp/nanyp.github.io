const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/errors")
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')

// Using imported constants
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "./front/public/images"
}))

// Import Routes
const products = require("./routes/products");
const users = require("./routes/auth")
const ventas = require("./routes/ventas")

// Browser path, modify object by view request
app.use("/api", products);
app.use("/api", users);
app.use("/api", ventas);

//MiddleWare to handle errors
app.use(errorMiddleware)
app.use(
    cors({
        origin: ["http://localhost:3000","https://stone-store.onrender.com"]
    })
);

module.exports = app;
