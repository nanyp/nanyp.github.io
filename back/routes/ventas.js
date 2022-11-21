const express = require('express')
const { getProductsCart, addProductCart, putProduct, deleteProduct, deleteProducts } = require('../controllers/cartController');
const router = express.Router();
const {getVentas, newVentas} = require("../controllers/ventasController")

router.route("/ventas").get(getVentas)
router.route("/ventas").post(newVentas)
router.route("/products-cart").get(getProductsCart)
router.route("/products-cart").post(addProductCart)
router.route("/products-cart/:productId").put(putProduct)
router.route("/products-cart/:productId").delete(deleteProduct)
router.route("/products-cart").delete(deleteProducts)

module.exports = router;