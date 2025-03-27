import express from "express";
import {signup,login,logout} from "../controllers/auth.controller.js";

const router =express.Router(); // This line creates an object of express that we can use to interact with the express server

router.post("/signup",signup);  // This line creates a post request to the /signup route and calls the signup function from the auth.controller.js file
router.post("/login",login); // This line creates a post request to the /login route and calls the login function from the auth.controller.js file
router.post("/logout",logout);  // This line creates a post request to the /logout route and calls the logout function from the auth.controller.js file
export default router;