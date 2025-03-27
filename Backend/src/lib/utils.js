import jwt from "jsonwebtoken";

export const generateToken= (userId,res) => {

    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn:"7d" // token will expire in 7 days
    });

    res.cookie("jwt",token,{
        maxAge: 7 * 24 * 60 * 60 * 1000, // token will expire in 7 days , time is in MS
        httpOnly:true, // cookie cannot be accessed by client side scripts, prevent XSS attacks
        sameSite: "strict", // cookie will only be sent in a first-party context,prevents CSRF attacks 
        secure:process.env.NODE_ENV !== "development" // cookie will only be sent in https in production
    });

    return token;
};
 