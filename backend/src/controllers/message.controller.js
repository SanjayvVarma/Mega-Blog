import ApiError from "../utils/ApiError.js";
import Message from "../models/message.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendMessageReply } from "../utils/email.js";

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
        new ApiResponse(201, createMessage, true, "Message received. We'll connect soon.")
    )
});

const getAllMessages = asyncHandler(async (req, res) => {
    const allMessages = await Message.find();

    if (!allMessages || allMessages.length === 0) {
        throw new ApiError(404, "No messages found");
    }

    return res.status(200).json(
        new ApiResponse(200, allMessages, true, "All messages fetched successfully")
    );
});

const replyToMessage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { reply } = req.body;

    if (!id || !reply) {
        throw new ApiError(400, "Message ID and Reply are required!");
    }

    const messageDoc = await Message.findById(id);

    if (!messageDoc) {
        throw new ApiError(404, "Message not found with this ID");
    }

    const email = messageDoc.email;

    try {
        await sendMessageReply(email, reply);
    } catch (error) {
        throw new ApiError(500, "Email send failed!");
    }

    await messageDoc.deleteOne();

    return res.status(200).json(
        new ApiResponse(200, null, true, "Reply Send Successfully")
    )
});

export { sendMessage, getAllMessages, replyToMessage };