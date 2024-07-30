import mongoose from "mongoose";
import validator from "validator";
const uerSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        minlength:[3,"username must be at least 3 characters"],
        maxlength:[20,"username must be at most 20 characters"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        validator:[validator.isEmail,"Please fill a valid email address"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
    },
    avatar:{
        type:String,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
},
{
    timestamps:true
})

//create the model
const User = mongoose.model("User",uerSchema);

export default User;