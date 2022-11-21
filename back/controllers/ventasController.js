const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const venta = require('../models/dbventas')

exports.getVentas = catchAsyncErrors(async (req, res, next) => {
    const ventas = await venta.find()
    if (!ventas) {
        return next(new ErrorHandler("ventas not found", 404))
    }
    res.status(200).json({
        success: true,
        count: ventas.length,
        ventas
      })
})

exports.newVentas = catchAsyncErrors(async (req, res, next) => {
    const ventas = await venta.insertMany(req.body);
  
    res.status(201).json({
      success: true,
      ventas
    })
  })