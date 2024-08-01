import { Schema } from "mongoose"
import mongoose from "mongoose"

const productSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
     
    },
    prodImage:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
       required:true
    }
},{
    timestamps:true
})

const Product = mongoose.model("Product", productSchema)

export default Product