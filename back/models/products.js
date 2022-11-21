const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Insert product name"],
        trim: true,
        maxLength: [120, "product name limited to 120 characters"]
    },
    price:{
        type:Number,
        required: [true, "Insert product price"],
        maxLength: [7, "maximum product value limited to 7 digits"],
        default: 0.0
    },
    description:{
        type: String,
        required: [true, "Insert product description"],
        maxLength: [3000, "product description limited to 300 characters"],
        default: 0.0
    },
    rating:{
        type: Number,
        default: 0
    },
    imagen:[
        {
            public_id: {
                type: String,
                required: true,
                default: "products/dsvbpny402gelwugv2lw"
            },
            url: {
                type: String,
                required: true,
                default: "./images/products/granito-rosabel.jpg"
            }
        }        
    ],
    category:{
        type: String,
        required: [true, "Insert product category"],
        enum: {
            values: [
                "Marmol",
                "Granito",
                "Travertino"
            ]
        }
    },
    role:{
        type: String,
        required: [true, "Insert product role_enum"],
        enum:{
            values:[
                "Administrator",
                "Customer"
            ]
        }
    },
    stock:{
        type: Number,
        required: [true, "Insert product stock"],
        maxLength: [5, "maximum stock of products limited to 5 digits"],
        default: 0
    },
    scoreProduct:{
        type: Number,
        default: 0
    },
    comments:[
        {
            nameCustomer:{
                type: String,
                required: true,
            },
            rating:{
                type: Number,
                required: true,
            },
            comment:{
                type: String,
                required: true,
            }

        }
    ],
    createAt:{
        type: Date,
        default: Date.now
    },
    inCart: {
        type: Boolean,
        default: false
    }
})

module.exports=mongoose.model("products", productSchema);