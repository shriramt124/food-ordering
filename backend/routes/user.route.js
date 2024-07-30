import express from "express"
import bcrypt from "bcryptjs"
const userRouter = express.Router();
import User from "../models/user.model.js";
import jwt from "jsonwebtoken"
import {isAuthenticated} from "../middleware/isAuthenticated.js"

userRouter.post("/register", async function (req, res) {
    const { username, email, password, role } = req.body;
    
    try {
        if (!username || !email || !password) {
            return res.status(400).json({
                status: false,
                message: "Please fill all the fields"
            })
        }
        //if there is existing user or not
        //if existing user then do login
        const existingUsre = await User.findOne({ email });
        if (existingUsre) {
            return res.status(400).json({
                status: false,
                message: "User already exists"
            })
        }
        //if not existing user then create new user
        //hash the passwrod
        const hashedPassword = await bcrypt.hash(password, 10);
        //create new user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            role
        })
        //send the response
        return res.status(201).json({
            status: true,
            message: "User created successfully",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            stack:error.stack
        })
    }
})


userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "Please fill all the fields"
            })
        }
        //check if user exist
        const userFound = await User.findOne({ email });
        if (!userFound) {
            return res.status(400).json({
                status: false,
                message: "User not found"
            })
        }
        //if user found then check if the password is correct or not 
        const isPasswordMatched = await bcrypt.compare(password, userFound.password);
        if (!isPasswordMatched) {
            return res.status(400).json({
                status: false,
                message: "invalid credentials"
            })
        }

        //create the token to help authorize and authenticate the user
        const token = await  jwt.sign({ id: userFound._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000*60*60
        })
        //if the password is coreect then send the response
        return res.status(200).json({
            status: true,
            message: "user loggedin succesfully",
            data: userFound,
            token
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
            stack:error.stack
        })
    }
})


userRouter.get("/logout",isAuthenticated,async (req,res)=>{
    try{
        res.clearCookie("token");
        return res.status(200).json({
            status:true,
            message:"user logged out successfully"
        })

    }catch(error){

    }
})
userRouter.get("/profile",isAuthenticated,async (req,res)=>{
    try {
        res.send("hello profile route")
    } catch (error) {
        return res.status(500).json({
            status:false,
            message:error.message,
            stack:error.stack
        })
    }
})

export default userRouter;