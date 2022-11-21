const app = require("./app")
const connectDataBase = require("./config/database");
const cloudinary = require("cloudinary")

// Set file config
const dotenv = require("dotenv");
dotenv.config({ path: 'back/config/config.env' })

// DB Config 
// connectDataBase({path: 'back/config/config.env'})
connectDataBase()

// Cloudinary Config 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// Call to sever
const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port: ${process.env.PORT} in mode: ${process.env.NODE_ENV}`)
})