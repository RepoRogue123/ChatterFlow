import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try{
        const token = req.cookies.jwt; // This line will get the token from the request cookies

        if(!token){
            return res.status(401).json({message:"Unauthorized - No token Provided"}); // This line will return a 401 error if the token is not found
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // This line will verify the token using the secret key

        if(!decoded){
            return res.status(401).json({message:"Unauthorized - Invalid token"}); // This line will return a 401 error if the token is invalid)
        }

        const user = await User.findById(decoded.userId).select("-password"); // This line will find the user in the database using the id from the token

        if(!user){
            return res.status(404).json({message:"Unauthorized - User not found"}); // This line will return a 401 error if the user is not found
        }

        req.user=user; // This line will attach the user object to the request object so that it can be used in the next middleware or route handler

        next(); // This line will call the next middleware or route handler
    }catch (error){
        console.log("Error in protectRoute middleware",error.message); 
        res.status(500).json({message: "Internal server error"}); 

    }
};