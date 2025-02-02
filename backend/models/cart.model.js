import mongoose from "mongoose"
import { Schema } from "mongoose"
 
const cartSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    products:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            },
            quantity:{
                type:Number,
                required:true
            }
        }
    ]
},{
    timestamps:true
})

const Cart = mongoose.model("Cart",cartSchema)

export default Cart
