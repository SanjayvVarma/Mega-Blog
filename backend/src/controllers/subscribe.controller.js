import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import Subscribe from "../models/subscribe.model.js";
import { sendConfirmationEmail, sendVerificationLink } from "../utils/email.js";

const createSubscription = asyncHandler(async (req, res) => {
    const { fullName, email } = req.body;

    if (!fullName || !email) {
        throw new ApiError(400, "All fields are required");
    }

    const existingSubscriber = await Subscribe.findOne({ email });
    if (existingSubscriber) {
        throw new ApiError(400, "Email is already subscribed.");
    }

    const token = jwt.sign(
        { fullName, email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
    );

    sendVerificationLink(fullName, email, token);

    return res.status(200).json(
        new ApiResponse(200, null, true, "Verification email sent. Please check your inbox.")
    );
});

const verifySubscription = asyncHandler(async (req, res) => {
    const { token } = req.query;

    if (!token) {
        throw new ApiError(400, "Verification token is missing");
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded) {
        throw new ApiError(401, "Invalid or expired token");

    }

    const { fullName, email } = decoded;

    const existingSubscriber = await Subscribe.findOne({ email });

    if (existingSubscriber) {
        throw new ApiError(400, "Email already verified and subscribed.");
    }

    const newSubscriber = await Subscribe.create({
        fullName,
        email,
        isVerified: true,
    });

    await sendConfirmationEmail(fullName, email)

    return res.status(200).json(
        new ApiResponse(200, newSubscriber, true, "Email verified and subscription completed.")
    );
});

const viewSubscribe = asyncHandler(async (req, res) => {

    const subscribers = await Subscribe.find({ isVerified: true }).sort({ createdAt: -1 });

    if (subscribers.length === 0) {
        throw new ApiError(404, "No verified subscribers found");
    }

    return res.status(200).json(
        new ApiResponse(200, subscribers, true, "Fetched verified subscribers")
    );
});

const deleteSubscribe = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const deleteSubscriber = await Subscribe.findByIdAndDelete(id)

    if (!deleteSubscriber) {
        throw new ApiError(404, "Subscriber not found")
    }

    return res.status(200).json(
        new ApiResponse(200, null, true, "Subscription deleted successfully")
    )

});

export { createSubscription, verifySubscription, viewSubscribe, deleteSubscribe };