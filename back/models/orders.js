const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    shippingInfo: {
        country: {
            type: String,
            required: true
        },
        departament: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "auth"
    },
    items: [{
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        imagen: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "products"
        }
    }
    ],
    paymentInfo: {
        id: {
            type: String
        },
        status: {
            type: String
        }
    },
    paymentDate: {
        type: Date
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    taxPrice: {
        type: Number,
        required: true,
        defautl: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    status: {
        type: String,
        required: true,
        default: "Processing"
    },
    shippingDate: {
        type: Date
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("orders", orderSchema)