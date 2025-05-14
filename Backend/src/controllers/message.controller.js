import User from "../models/user.model.js";
import Message from "../models/user.models.js"

export const getUsersForSidebar = async (req, res) => {
    try{
        const loggedInUserId = req.user._id; // This line will get the logged in user id from the request object
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password"); // This line will find all the users in the database except the logged in user and exclude the password field from the result

        res.status(200).json(filteredUsers); // This line will return the filtered users in the response
    }catch (error){
        console.error("Error in getUsersForSidebar: ",error.message);
        res.status(500).json({error:"Internal server error"}); 
    }
};

export const getMessages = async (req, res) => {
    try{
        const {id:usertoChatId}=req.params;
        const myId=req.user._id;

        const messages = await Message.find({
            $or:[
                { myId:myId, receiverId:usertoChatId},
                { myId:usertoChatId, receiverId:myId}
            ]
        })

        res.status(200).json(messages);
    }catch (error){
        console.log("Error in getMessages controller: ",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const sendMessage = async (req, res) => {
    try{
        const {text,image} =req.body; // This line will get the text and image from the request body
        const {id:receiverId}=req.params; // This line will get the receiver id from the request parameters
        const senderId=req.user._id; // This line will get the sender id from the request object

        let imageUrl;
        if(images){
            // Upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url; // This line will get the secure url of the uploaded image
        }

        const newMessage =new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        });

        await newMessage.save(); // This line will save the new message to the database
        
        // todo: realtime functionality goes here => socket.io


        res.status(201).json(newMessage); // This line will return the new message in the response

    } catch(error){
        console.log("Error in sendMessage controller: ",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}