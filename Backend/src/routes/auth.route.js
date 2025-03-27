import express from "express";

const router =express.Router(); // This line creates an object of express that we can use to interact with the express server

router.get("/signup",(reg,res) => {
    res.send("signup route");
});
router.get("/login",(reg,res) => {
    res.send("login route");
});
router.get("/logout",(reg,res) => {
    res.send("logout route");
});
export default router;