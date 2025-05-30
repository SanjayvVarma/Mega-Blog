import OTP from "../models/OTP.model.js";
import otpGenerator from "otp-generator";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendVerificationCode } from "../utils/email.js";

const sendOtp = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        throw new ApiError(409, "User with this email already exists");
    }

    const otp = otpGenerator.generate(6, {
        digits: true,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
    });
    const otpExpiry = Date.now() + 5 * 60 * 1000;

    await OTP.findOneAndUpdate(
        { email },
        { otp, expiresAt: otpExpiry, isVerify: false },
        { upsert: true, new: true }
    );

    await sendVerificationCode(email, otp);

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

    existingOtp.verified = true;
    await existingOtp.save();

    return res.status(200).json(
        new ApiResponse(200, null, true, "OTP verified successfully")
    );
});

export { sendOtp, verifyOtp };