import OTP from "../models/OTP.model.js";
import otpGenerator from "otp-generator";
import { sendVerificationCode } from "./email.js";

const generateAndSendOtp = async (email) => {
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
}

export default generateAndSendOtp;