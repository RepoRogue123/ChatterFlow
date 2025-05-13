import express form "express"; // Importing express module
import {protectRoute} from "../middleware/auth.middleware.js"; // Importing protectRoute middleware to protect routes

const router = express.Router(); // Creating a new router object


router.get("/users",protectRoute,getUsersForSidebar); // This line will get the users for the sidebar and protect the route using the protectRoute middleware
router.get("/:id",protectRoute,getMessages);
router.post("/sender/:id",protectRoute,sendMessage); // This line will send a message and protect the route using the protectRoute middleware
export default router; // Exporting the router object