const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  img: { type: String, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
});

module.exports=mongoose.model("carts", cartSchema)
