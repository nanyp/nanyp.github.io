const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require('../models/products');
const Cart = require("../models/carts");

exports.getProducts = async (req, res) => {
    const products = await Product.find();

    if (products){
        res.json({ products });
    } else {
        res.json({ message: "Not there products "});
    }
};

exports.getProductsCart = async(req, res) => {
    const productsCart = await Cart.find();

    if ( productsCart ) {
        res.json({ productsCart});
    } else {
        res.json({ message: "Not product in the car" });
    }
};

exports.addProductCart = async (req, res) => {
    const { name, img, price, amount } = req.body;  //Aquí se ponen los parámetros de acuerdo a nuestro proyecto

    //Vemos si el producto tiene existencias
    const isInProducts = await Product.findOne({ name });

    //Vemos que todos los campos tengan info
    const fullCart = name !== "" && img !== "" && price !== "";

    //Vemos que el producto esté en el carrito
    const isInCart = await Cart.findOne({ name });

    //Si no hay producto
    if(!isInProducts) {
        res.status(400).json({
            message: "This product is not available",
        });

        //Si nos envían algo que no esta en el carrito lo agregamos
    } else if (fullCart && !isInCart) {
        const newProductInCart = new Cart({ name, img, price, amount });

        //Actualiza a prop inCart: true en nuestros productos

    await Product.findByIdAndUpdate(
        isInProducts?._id,
        { inCart: true, name, img, price },
        { new: true }
    )
    .then((product)   => {
        newProductInCart.save();
        res.json({
            message: "The product now is on the car",
            product,
        });
    })
    .catch((error) => console.error(error));

    //Si está en el carrito mandamos alerta
    } else if(isInCart){
        res.status(400).json({
            message: "The product is on the car"
        });
    }
};

exports.putProduct = async (req, res) => {
    const { productId } = req.params;
    const { query } = req.query;
    const body = req.body;

    //Buscar producto en el carro
    const wantedProduct = await Cart.findById(productId);

    //Si no añaden o borran
    if (!query){
        res.status(400).json({ message: "Please, submit a query"});

        //agregar más productos
    } else if (wantedProduct && query === "add") {
        body.amount = body.amount +1;

        await Cart.findByIdAndUpdate(productId, body, {
            new: true,
        }).then((product) => {
            res.json({
                message: `The product ${product.name} was updated`, //Por favor ayudarme a poner el símbolo bien porque no sé como poner las comillas adecuadas en mi pc
                product,
            });
        });

        //Sacar un producto del carrito
    } else if (wantedProduct && query === "del"){
        body.amount = body.amount -1;

        await Cart.findByIdAndUpdate(productId, body, {
            new: true,
        }).then((product) => {
            res.json({
                message: `The product ${product.name} was updated`, //Por favor ayudarme a poner el símbolo bien porque no sé como poner las comillas adecuadas en mi pc
                product,
            });
        });
    } else {
        res.status(400).json({ message: "An error occurred"});
    }
};

exports.deleteProduct = async (req, res) => {
    const { productId } = req.params;

    //Buscamos el producto en el carrito
    const productInCart = await Cart.findById(productId);

    //Buscamos el producto en BD según el nombre en que se almacenó en el carrito
    const { name, img, price, _id } = await Product.findOne({
        name: productInCart.name,
    });

    //Buscar y eliminar el producto por id
    await Cart.findByIdAndDelete(productId);

    await Product.findByIdAndUpdate(
        _id,
        { inCart: false, name, img, price },
        { new: true }
    )
    .then((product) => {
        res.json({
            message: `The product ${product.name} was delete of the car`,
        });
    })
    .catch((error) => res.json({ message: "An error occurred"}));
};

exports.deleteProducts = catchAsyncErrors(async (req, res, next) => {
    const productsCart = await Cart.remove();
  
    res.status(201).json({
      success: true,
      productsCart
    })
  })
