const mongoose = require('mongoose')

const dbventasSchema = mongoose.Schema({
    fecha: Date,
    categoria: String,
    _idproducto: String,
    cantidad: Number,
    precio: Number
})

module.exports=mongoose.model("dbventas", dbventasSchema)