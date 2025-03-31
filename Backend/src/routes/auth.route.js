import express from "express";
import {checkAuth,signup,login,logout,updateProfile} from "../controllers/auth.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js"; // This line imports the protectRoute middleware from the auth.middleware.js file

const router =express.Router(); // This line creates an object of express that we can use to interact with the express server

router.post("/signup",signup);  // This line creates a post request to the /signup route and calls the signup function from the auth.controller.js file
router.post("/login",login); // This line creates a post request to the /login route and calls the login function from the auth.controller.js file
router.post("/logout",logout);  // This line creates a post request to the /logout route and calls the logout function from the auth.controller.js file

router.put("/update-profile",protectRoute,updateProfile); //This line first checkes if the user is logged in and then calls the updateProfile function from the auth.controller.js file

router.get("/check",protectRoute,checkAuth) // This line first checkes if the user is logged in and then calls the checkAuth function from the auth.controller.js file
export default router;