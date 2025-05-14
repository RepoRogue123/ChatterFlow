import express from "express"; // Importing express module
import dotenv from "dotenv"; // Importing dotenv module to load environment variables
import cookieParser from "cookie-parser"; // Importing cookie-parser module to parse cookies
import cors from "cors"; // Importing cors module to enable Cross-Origin Resource Sharing

import {connectDB} from "./lib/db.js"; // Importing connectDB function to connect to the database

import authroutes from "./routes/auth.route.js"; // Importing authroutes from auth.route.js file
import messageRoutes from "./routes/message.route.js"; // Importing messageRoutes from message.route.js file

dotenv.config(); // Loading environment variables from .env file

const app = express();

const PORT = process.env.PORT;

app.use(express.json()); // Middleware to parse JSON data from incoming requests
app.use(cookieParser()); // Middleware to parse cookies from incoming requests
app.use(cors(
    {
        origin: "http://localhost:5173", // Allow requests from the client URL
        credentials: true, // Allow credentials to be included in requests
    }
));

app.use("/api/auth", authroutes); // Mounting authroutes on /api/auth path
app.use("/api/message", messageRoutes); // Mounting authroutes on /api/message path
app.listen(PORT, () => {
    console.log("server is running on PORT:"+PORT); // Logging the server port to the console
    connectDB(); // Calling connectDB function to connect to the database
});