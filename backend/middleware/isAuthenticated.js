import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
    //get the token from authorization header 
    const token = req.header('Authorization')?.replace('Bearer ', '');
    try {
        if (!token) return res.status(401).json({
            status: false,
            message: "Access Token is required"
        })

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
        req.user = decoded.id;
        next();

    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                status: false,
                message: "access token is  expired",
                code: "AccessTokenExpired"
            })
        }
        else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                staus: false,
                message: "access token is  invalid",
                code: "AccessTokenInvalid"
            })
        }

        return res.status(401).json({
            status: false,
            message: error.message
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
