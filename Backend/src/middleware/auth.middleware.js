import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
    try{
        const token =req.cookies.jwt; // This line will get the token from the request cookies
        if (!token){
            return res.status(401).json({message:"Unauthorized-No Token Provided"}); // This line will return a 401 error if the token is not found
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // This line will verify the token using the secret key
        if(!decoded){
            return res.status(401).json({message:"Unauthorized-Invalid Token"}); // This line will return a 401 error if the token is invalid
        }

        const user= await User.findById(decoded.userId).select("-password"); // This line will find the user in the database using the id from the token and exclude the password field from the result

        if(!user){
            return res.status(401).json({message:"Unauthorized-User not found"}); // This line will return a 401 error if the user is not found
        }

        req.user = User

        next()
    } catch (error){
        console.log("Error in protectRoute middleware", error.message); // This line will log the error message to the console
        res.status(500).json({message:"Internal Server error"}); // This line will return a 500 error if there is a server error
    }

};