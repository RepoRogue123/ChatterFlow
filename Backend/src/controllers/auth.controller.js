import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js"; // This line imports the cloudinary object from the cloudinary.js file

export const  signup = async (req,res) => {
    const {fullName,email,password} = req.body;
    try{
        // hash the password
        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        if(password.length < 6){
            return res.status(400).json({message:"Password must be atleast 6 characters long"});
        }

        const user = await User.findOne({email})

        if (user) return res.status(400).json({message:"Email already exists"});

        const salt =await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User(
            {
                fullName:fullName,
                email:email,
                password:hashedPassword
            }
        )

        if(newUser){
            // generate jwt token here
            generateToken(newUser._id,res)
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            })

        } else{
            res.status(400).json({message:"Invalid user data"});
        }

    } catch (error){
        console.log("Error in signup controller", error.message);
        res.status(500).json({message:"Server error"});
    }
};

export const  login = async (req,res) => {

    const{email,password}= req.body; // This line will get the email and password from the request body
    try{
        const user = await User.findOne({email}); // This line will find the user in the database with the email provided in the request body
        if(!user){
            return res.status(400).json({message:"Invalid credentials"}); // This line will return a 400 error if the user is not found
        }

        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials"}); // This line will return a 400 error if the password is not correct
        }

        generateToken(user._id,res); // This line will generate a token for the user and send it in the response
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
        }); // This line will return the user object in the response
    } catch (error){
        console.log("Error in login controller", error.message);
        res.status(500).json({message:"Internal Server error"}); // This line will return a 500 error if there is a server error
    }
};

export const  logout = (req,res) => {
    try{
        res.cookie("jwt","",{maxAge:0}); // This line will clear the cookie by setting the maxAge to 0
        res.status(200).json({message:"Logged out successful"}); // This line will return a 200 status code and a message

    } catch(error){
        console.log("Error in logout controller",error.message);
        res.status(500).json({message:"Internal Server error"}); // This line will return a 500 error if there is a server error
    }
};

export const updateProfile = async (req,res) => {
     try{
        const{profilePic}=req.body;
        const userId=req.user._id; // This line will get the user id from the request object that was set in the protectRoute middleware

        if(!profilePic){
            return res.status(400).json({message:"Profile pic is required"}); // This line will return a 400 error if the profile pic is not found
        }

        const uploadResponse=await cloudinary.uploader.upload(profilePic); // This line will upload the profile pic to cloudinary and get the response
        const updatedUser=await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true}); // This line will update the user in the database with the new profile pic and return the updated user

        res.status(200).json(updatedUser);
    }catch(error){
        console.log("Error in updateProfile controller",error.message); 
        res.status(500).json({message:"Internal Server error"}); 
    }
};

export const checkAuth = (req,res) => {
    try{
        res.status(200).json(req.user); // Fixed: Changed req.status to res.status
    } catch(error){
        console.log("Error in checkAuth controller",error.message); // This line will log the error message to the console
        res.status(500).json({message:"Internal Server error"}); // This line will return a 500 error if there is a server error 
    }
};
