import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { generateAccessAndRefreshToken } from "../middlewares/auth.meddleware.js";
import { deleteFromCloudinary, getPublicIdFromUrl } from "../utils/deleteFiles.js";

const userRegister = asyncHandler(async (req, res) => {

    const { fullName, email, password, phone, answer, education, role } = req.body

    if (!fullName || !email || !password || !phone || !answer || !education || !role) {
        throw new ApiError(400, 'All fields required')
    }

    const existingUser = await User.findOne({
        $or: [{ email }, { phone }]
    })

    if (existingUser) {
        throw new ApiError(409, "User with email or phone  already exists")
    }

    if (!req.files?.avatar || req.files.avatar.length === 0) {
        throw new ApiError(400, "Avatar file is required");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar) {
        throw new ApiError(500, "Avatar upload failed");
    }

    const user = await User.create({
        fullName,
        email,
        password,
        phone,
        answer,
        education,
        role,
        avatar: avatar.url
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken -answer")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating user")
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, true, "User registered Successfully")
    )

});

const userLogin = asyncHandler(async (req, res) => {

    const { email, phone, password, role } = req.body;

    if ((!email && !phone) || !role) {
        throw new ApiError(400, "Email or phone and role are required")
    }

    const user = await User.findOne({
        $or: [{ email }, { phone }]
    }).select("+password")


    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.role !== role) {
        throw new ApiError(403, "Invalid role for this user");
    }

    const isPasswordValid = await user.comparePassword(password)

    if (!isPasswordValid) {
        throw new ApiError(401, 'invalid user credentials')
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken -answer")

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, true, "User logged in Successfully")
        )

});

const userLogout = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: { refreshToken: 1 }
        },
        {
            new: true
        }
    )

    const option = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict"
    }

    return res
        .status(200)
        .clearCookie("accessToken", option)
        .clearCookie("refreshToken", option)
        .json(
            new ApiResponse(200, null, true, "Logout successful")
        )

});

const getCurrentUser = asyncHandler(async (req, res) => {

    const user = req.user;

    return res.status(200).json(
        new ApiResponse(200, user, true, 'user fetched successfully')
    )

});

const getAllusers = asyncHandler(async (req, res) => {

    const users = await User.find({ role: "Reader" })

    if (users.length === 0) {
        throw new ApiError(404, "No reader users found");
    }

    return res.status(200).json(
        new ApiResponse(200, users, true, "All reader user found")
    )
});

const getAllAdmin = asyncHandler(async (req, res) => {
    const admins = await User.find({ role: "Admin" })

    if (!admins || admins.length === 0) {
        throw new ApiError(404, "No Admins Found");
    }

    return res.status(200).json(
        new ApiResponse(200, admins, true, "All Admins Fetched Successfully")
    );
});

const forgotPassword = asyncHandler(async (req, res) => {

    const { email, phone, answer, newPassword } = req.body

    if ((!email && !phone) || !answer || !newPassword) {

        throw new ApiError(400, 'All Fields are required')
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(newPassword)) {
        throw new ApiError(400, 'Must include A-Z, a-z, 0-9 & special char');
    }

    const user = await User.findOne({
        $or: [{ email }, { phone }]
    })

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    if (user.answer !== answer) {
        throw new ApiError(401, "Incorrect security answer")
    }

    user.password = newPassword

    await user.save({ validateBeforeSave: false })

    return res.status(200).json(
        new ApiResponse(200, {}, true, "Password reset successfully")
    )

});

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await User.findOneAndDelete({ _id: id, role: "Reader" })

    if (!user) {
        throw new ApiError(404, "Invalid user or user is not a Reader");
    }

    const publicId = getPublicIdFromUrl(user.avatar)

    if (publicId) {
        await deleteFromCloudinary(publicId)
    }

    return res.status(200).json(
        new ApiResponse(200, null, true, "user deleted successfully")
    )

});

const updateUserDetails = asyncHandler(async (req, res) => {
    const id = req.user?._id;
    const { fullName, email, phone, education, answer } = req.body;

    if (!fullName && !email && !phone && !education && !answer) {
        throw new ApiError(400, "At least one field is required to update");
    }

    const updatedUser = await User.findByIdAndUpdate(
        id,
        {
            $set: {
                fullName,
                email,
                phone,
                education,
                answer
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken -answer")

    if (!updatedUser) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(
        new ApiResponse(200, updatedUser, true, "user details updated successfully")
    )
});

const updateUserAvatar = asyncHandler(async (req, res) => {
    const user = req.user;
    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar file is missing")
    }

    if (user.avatar) {
        const publicId = getPublicIdFromUrl(user.avatar);
        if (publicId) {
            await deleteFromCloudinary(publicId);
        }
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar || !avatar.url) {
        throw new ApiError(500, "Failed to upload avatar");
    }

    const updatedUser = await User.findByIdAndUpdate(
        user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken -answer")

    if (!updatedUser) {
        throw new ApiError(404, "user not found")
    }

    return res.status(200).json(
        new ApiResponse(200, updatedUser, true, "Avatar profile updated successfully")
    )

});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user?._id;

    if (!oldPassword || !newPassword) {
        throw new ApiError(400, "Both old and new passwords are required");
    }

    if (oldPassword === newPassword) {
        throw new ApiError(400, "New password cannot be the same as old password");
    }

    const user = await User.findById(userId).select("+password")

    if (!user) {
        throw new ApiError(404, "user not found")
    }

    const isPasswordValid = await user.comparePassword(oldPassword)

    if (!isPasswordValid) {
        throw new ApiError(400, "old password is not a valid")
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(newPassword)) {
        throw new ApiError(400, 'Must include A-Z, a-z, 0-9 & special char');
    }

    user.password = newPassword

    await user.save({ validateBeforeSave: false })

    return res.status(200).json(
        new ApiResponse(200, {}, true, "password changed successfully")
    )

});

export { userRegister, userLogin, userLogout, getCurrentUser, getAllusers, forgotPassword, deleteUser, updateUserDetails, updateUserAvatar, changeCurrentPassword, getAllAdmin };