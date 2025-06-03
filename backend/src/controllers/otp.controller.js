import OTP from "../models/OTP.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateAndSendOtp from "../utils/generateAndSendOtp.js";

const sendOtpForRegister = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        throw new ApiError(409, "User with this email already exists");
    }

    await generateAndSendOtp(email)

    return res.status(200).json(
        new ApiResponse(200, null, true, "OTP sent successfully")
    );

});

const sendOtpForResetPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "email is required")
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(404, 'You are not registered with us');
    }

    await generateAndSendOtp(email)

    return res.status(200).json(
        new ApiResponse(200, null, true, "OTP sent successfully")
    );
});

const verifyOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    const existingOtp = await OTP.findOne({ email });

    if (!existingOtp) {
        throw new ApiError(404, "OTP not found");
    }

    if (existingOtp.otp !== otp) {
        throw new ApiError(400, "Invalid OTP");
    }

    if (existingOtp.expiresAt < Date.now()) {
        throw new ApiError(400, "OTP expired");
    }

    existingOtp.isVerify = true

    await existingOtp.save()

    return res.status(200).json(
        new ApiResponse(200, null, true, "OTP verified successfully")
    );
});

export { sendOtpForRegister, sendOtpForResetPassword, verifyOtp };