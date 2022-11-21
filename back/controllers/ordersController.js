const Order = require("../models/orders");
const Products = require("../models/products")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

// Build a new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        items,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        items,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paymentDate: Date.now(),
        user: req.user._id
    })

    res.status(201).json({
        success: true,
        order
    })
})

// View a specific order --> Registered user
exports.getOrderById = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email")

    if (!order) {
        return next(new ErrorHandler("Order is not registered", 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})

// View all orders --> Registered user
exports.getMyOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        orders
    })
})

// ==================================================================================================
// ===============================/ Services controlled only by Admin \==============================

// View all orders --> Auth Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find()

    let totalQuantity = 0;
    orders.forEach(order => {
        totalQuantity = totalQuantity + order.totalPrice
        // totalQuantity += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalQuantity,
        orders
    })

})

// Update a order --> Auth Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        return next(new ErrorHandler("Order not found", 404))
    }

    if (order.status === "Shipped") {
        return next(new ErrorHandler("This order has already been shipped", 400))
    }

    order.status = req.body.status;
    order.shippingDate = Date.now();

    await order.save()

    res.status(200).json({
        success: true,
        order
    })
})

// Allows you to update the inventory of each product
async function updateStock(id, quantity) {
    const product = await Products.findById(id);
    product.stock = product.stock- quantity;
    await product.save({ validateBeforeSave: false })
}

// Delete a orden --> Auth Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order is not registered", 404))
    }
    await order.remove()

    res.status(200).json({
        success: true,
        message: "Order deleted successfully"
    })
})