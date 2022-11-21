const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsController");

// Build route view all products
router.route("/products").get(getProducts);

// Build route view products by ID
router.route("/product/:id").get(getProductById);

// Build route view a new product
router.route("/product/new").post(newProduct);

// Build route update product by ID
router.route("/product/:id").put(updateProduct);

// Build route delete product by ID
router.route("/product/:id").delete(deleteProduct);

module.exports = router;
