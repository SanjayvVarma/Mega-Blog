import ApiError from "../utils/ApiError.js";
import Message from "../models/message.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const sendMessage = asyncHandler(async (req, res) => {
    const { fullName, email, message } = req.body;

    if (!fullName || !email || !message) {
        throw new ApiError(400, "All Field are Required");
    };

    let createMessage;

    const existingMessage = await Message.findOne({ email });

    if (existingMessage) {
        existingMessage.message.push(message)
        existingMessage.save()
        createMessage = existingMessage;

    } else {
        createMessage = await Message.create({
            fullName,
            email,
            message
        });
    }

    if (!createMessage) {
        throw new ApiError(409, "Message Send Failed")
    }

    return res.status(201).json(
        new ApiResponse(201, createMessage, true, "Message Send Successfully")
    )
});

const getAllMessages = asyncHandler(async (req, res) => {
    const allMessages = await Message.find().sort({ createdAt: -1 });

    if (!allMessages || allMessages.length === 0) {
        throw new ApiError(404, "No messages found");
    }

    return res.status(200).json(
        new ApiResponse(200, allMessages, true, "All messages fetched successfully")
    );
});

export { sendMessage, getAllMessages };