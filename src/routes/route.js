// This file defines the routes for the products management application.

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const cartController = require("../controllers/cartController");
const orderController = require("../controllers/orderController");
const {auth} = require("../middleWare/auth");

// The `userController` module contains the controllers for the user API.
// The `productController` module contains the controllers for the product API.
// The `cartController` module contains the controllers for the cart API.
// The `orderController` module contains the controllers for the order API.
// The `auth` middleware is used to protect the routes that require users to be authenticated.

// API for user
router.post("/register",userController.createUser);
router.post("/login" , userController.loginUser);
router.get("/user/:userId/profile" , auth, userController.getUserById);
router.put("/user/:userId/profile", auth, userController.updateUser);

// API for product
router.post("/products" , productController.createProduct);
router.get("/products" , productController.getProduct);
router.get("/products/:productId" , productController.getDetailsFromParam);
router.put("/products/:productId" , productController.updateProduct);
router.delete("/products/:productId", productController.deleteById);

// API for cart
router.post("/users/:userId/cart", auth , cartController.createCart );
router.get("/users/:userId/cart", auth , cartController.getCart );
router.put("/users/:userId/cart", auth , cartController.updateCart );
router.delete("/users/:userId/cart", auth , cartController.deleteCart );

// API for order
router.post("/users/:userId/orders", auth, orderController.createOrder );
router.put("/users/:userId/orders", auth ,orderController.updateOrder);

//API for wrong route-of-API
router.all("/*", function (req, res) {
    res.status(400).send({
        status: false,
        message: "Path Not Found"
    })
});

module.exports = router;
