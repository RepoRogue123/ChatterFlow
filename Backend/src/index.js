import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";

dotenv.config()
const app = express(); // This line creates an object of express that we can use to interact with the express server

const PORT =process.env.PORT
app.use(express.json()) // This line tells the express server to use json data from the request body

app.use("/api/auth",authRoutes)// This line tells the express server to use the authRoutes object when a request is made to the /api/auth route

app.listen(PORT,() => {
    console.log("Server is running on PORT:" + PORT);
    connectDB()

});