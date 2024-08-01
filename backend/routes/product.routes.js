import express from "express"
const productRouter = express.Router()
import Product from "../models/product.model.js"
import { uploader } from "../utils/multer.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

productRouter.get("/", async (req, res) => {
    const { price, category, quantity, limit, page } = req.query;
    try {
        let query = {}
        if (price) {
            query.price = { $gt: parseInt(price) };
        }
        if (category) {
            query.category = category;
        }
        if (quantity) {
            query.quantity = { $gte: parseInt(quantity) };
        }
        const limitValue = parseInt(limit) || 10;
        const pageValue = parseInt(page) || 1;
        const skipValue = (pageValue - 1) * limitValue;
        const products = await Product.find(query)
            .skip(skipValue)
            .limit(limitValue);

        return res.status(200).json({
            status: true,
            message: "Products fetched successfully",
            data: products
        })
    } catch (error) {
        console.log("error product route all");
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }

})


productRouter.post("/addProduct",isAuthenticated,uploader.single("prodImage"), async (req, res) => {
    const { title, description, price, category,quantity } = req.body;
    try {
        if (!title || !description || !price || !category) {
            return res.status(400).json({
                status: false,
                message: "All fields are required"
            })
        }
        if (!req.files) {
            return res.status(400).json({
                status: false,
                message: "No file uploaded"
            })
        }
        const url = req.file;

        const product = await Product.create({
            title,
            description,
            price,
            category,
            quantity:quantity?? 1,
            prodImage:url
        })
        return res.status(201).json({
            status: true,
            message: "Product added successfully",
            data: product
        })

    } catch (error) {
        console.log("error product route all");
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
})
productRouter.get("/details/:id",async(req,res)=>{
    const {id} = req.params;
    try {
        const product = await Product.findById(id);
        return res.status(200).json({
            status: true,
            message: "Product fetched successfully",
            data: product
        })
    } catch (error) {
        console.log("error product route all");
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
})

productRouter.put("/updateProduct/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, price, category } = req.body;
    try {
        if (!title || !description || !price || !category) {
            return res.status(400).json({
                status: false,
                message: "All fields are required"
            })
        }
        const product = await Product.findByIdAndUpdate(id, {
            title,
            description,
            price,
            category
        }, { new: true });
        return res.status(200).json({
            status: true,
            message: "Product updated successfully",
            data: product
        })

    } catch (error) {
        console.log("error product route all");
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
})

productRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({
                status: false,
                message: "Please provide a valid id"
            })
        }
        const product = await Product.findByIdAndDelete(id);
        return res.status(200).json({
            status: true,
            message: "Product deleted successfully",
            data: product
        })
    } catch (error) {
        console.log("error product route all");
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }

})

export default productRouter;