import express from "express"
import Cart from "../models/cart.model.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";

const cartRouter = express.Router();

//create a route post the items in the cart

cartRouter.post("/add-product/:productId", async (req, res) => {

    const productId = req.params.productId;
    const userId = req.user._id;

    try {
        // Find the product
        const product = await Product.findById(productId);
        if (!product) return res.status(400).json({ status: false, message: "Product not found" });

        // Find the user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                status: false,
                message: "User not found"
            });
        }

        // Find the cart
        let cart = await Cart.findOne({ user: user._id });
        if (!cart) {
            cart = await Cart.create({ user: user });
            user.cart = cart;
            cart.user = user;
        }

        // Check if the product is already in the cart
        const existingProduct = cart.products.find((prodInCart) => prodInCart.product.toString() === productId);
        if (existingProduct) {
            // If the product is already in the cart, update the quantity
            existingProduct.quantity += 1;
        } else {
            // If the product is not in the cart, add it
            cart.products.push({
                product: productId,
                quantity: 1
            });
        }


        // Save the updated cart
        await cart.save();
        await user.save();


        return res.status(200).json({
            status: true,
            message: "Product added to cart successfully",
            data: cart
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            stack: error.stack
        })
    }
});

cartRouter.get("/getCart", async (req, res) => {

    const userId = req.user._id;


    try {
        // Find the cart for the user
        const cart = await Cart.findOne({ user: userId }).populate('products.product');


        if (!cart) {

            return res.status(404).json({
                status: false,
                message: "Cart not found"
            });
        }
        if (cart.user.toString() !== userId.toString()) {
            return res.status(401).json({
                status: false,
                message: "You are not authorized to  access this cart"
            })
        }

        return res.json({
            status: true,
            cart: {
                products: cart.products,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Error retrieving cart"
        });
    }
});

cartRouter.delete('/remove-product/:productId', async (req, res) => {
    const userId = req.user._id;
    const productId = req.params.productId;
    try {
        // Find the cart for the user
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                status: false,
                message: "Cart not found"
            });
        }

        // Find the product in the cart

        const index = cart.products.findIndex((product) => product._id.toString() === productId.toString());

        if (index === -1) {
            return res.status(404).json({
                status: false,
                message: "Product not found in cart"
            });
        }

        // Remove the product from the cart
        cart.products.splice(index, 1);

        // Save the updated cart
        await cart.save();

        res.json({
            status: true,
            message: "Product removed from cart"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Error removing product from cart"
        });
    }
});

cartRouter.put("/update-quantity/:productId", async (req, res) => {
    const productId = req.params.productId;
    const userId = req.user._id;
    const newQuantity = req.body.quantity;

    try {
        // Find the cart for the user
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                status: false,
                message: "Cart not found"
            });
        }

        // Find the product in the cart
        const index = cart.products.findIndex((product) => product._id.toString() === productId.toString());

        if (index === -1) {
            return res.status(404).json({
                status: false,
                message: "Product not found in cart"
            });
        }

        // Update the quantity of the product in the cart
        cart.products[index].quantity = newQuantity;

        // Save the updated cart
        await cart.save();

        res.json({
            status: true,
            message: "Cart item quantity updated",
            data: cart
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Error updating cart item quantity"
        });
    }
});

export default cartRouter;
