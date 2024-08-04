import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export async function isAuthenticated(req, res, next) {


    const token = req.cookies.token;
    console.log(req.cookies,"from isauthencticated")
    console.log(token,"from authenticated user")
    try {

        //take the token from the cookies

        if (!token) {
            return res.status(401).json({
                status: false,
                message: "unauthorized user"
            })
        }
        //verify the token
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        //take the user from the decoded token
        if (!decoded) {
            return res.status(401).json({
                status: false,
                message: "You are not authorized to do view this page"
            })
        }
        req.user = decoded.id;
       console.log(req.user)
        next();

    } catch (error) {
        console.log("error in is authenticated")
        return res.status(500).json({
            status: false,
            message: error.message,
            stack: error.stack
        })
    }
}

//make an is authorized user based on the user and admin

export async function isAuthorizedUser(req, res, next) {
    const userId = req.user
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            })
        }
        if (user.role !== "admin") {
            return res.status(403).json({
                status: false,
                message:"you are not authorized to view this route"
            })
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("error in is authorized user")
        return res.status(500).json({
            status: false,
            message: error.message,
            stack: error.stack
        })


    }
}
