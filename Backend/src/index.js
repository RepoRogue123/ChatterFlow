import dotenv from "dotenv";
// Configure dotenv before any other imports
dotenv.config();

import express from "express";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";

const app = express(); // This line creates an object of express that we can use to interact with the express server

// Validate critical environment variables
if (!process.env.JWT_SECRET) {
  console.error("Error: JWT_SECRET is not defined in environment variables");
  process.exit(1);
}

const PORT = process.env.PORT || 5001;
app.use(express.json()) // This line tells the express server to use json data from the request body

app.use("/api/auth", authRoutes) // This line tells the express server to use the authRoutes object when a request is made to the /api/auth route

// Connect to the database first, then start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on PORT:" + PORT);
    });
  })
  .catch(err => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });