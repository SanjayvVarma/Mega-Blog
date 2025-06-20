import OTP from "../models/OTP.model.js";
import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendWelcomeEmail } from "../utils/email.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { generateAccessAndRefreshToken } from "../middlewares/auth.meddleware.js";
import { deleteFromCloudinary, getPublicIdFromUrl } from "../utils/deleteFiles.js";

const userRegister = asyncHandler(async (req, res) => {

    const { fullName, email, password, phone, about, answer, education, role } = req.body;

    const isVerified = await OTP.findOne({ email })

    if (!isVerified || !isVerified.isVerify) {
        throw new ApiError(400, "Please verify email");
    }

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
        about,
        answer,
        education,
        role,
        avatar: avatar.url
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken -answer")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating user")
    }

    await sendWelcomeEmail(email, fullName)

    await OTP.deleteOne({ email });

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

    if (user.isBlocked) {
        throw new ApiError(403, "Your account is blocked. Please contact support.");
    }

    const isPasswordValid = await user.comparePassword(password)

    if (!isPasswordValid) {
        throw new ApiError(401, 'invalid user credentials')
    }

    const previousLoginTime = user.lastLogin;

    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken -answer")

    loggedInUser.lastLogin = previousLoginTime || null;

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? 'None' : "Lax"
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, true, `${loggedInUser.fullName}, login successful! Ready to explore?`)
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
        sameSite: process.env.NODE_ENV === "production" ? 'None' : "Lax"
    }

    return res
        .status(200)
        .clearCookie("accessToken", option)
        .clearCookie("refreshToken", option)
        .json(
            new ApiResponse(200, null, true, `You have successfully logged out. Have a great day!`)
        )

});

const getCurrentUser = asyncHandler(async (req, res) => {

    const user = req.user;

    return res.status(200).json(
        new ApiResponse(200, user, true, 'user fetched successfully')
    )

});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();

    if (!users || users.length === 0) {
        throw new ApiError(404, "No users found at the moment")
    }

    return res.status(200).json(
        new ApiResponse(200, users, true, "All platform users fetched successfully")
    )
});

const getAllReader = asyncHandler(async (req, res) => {

    const users = await User.find({ role: "Reader" })

    if (users.length === 0) {
        throw new ApiError(404, "No reader users found");
    }

    return res.status(200).json(
        new ApiResponse(200, users, true, "All reader user found")
    )
});

const getAllAuthor = asyncHandler(async (req, res) => {
    const admins = await User.find({ role: "Author" })

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

const resetPasswordViaEmailOtp = asyncHandler(async (req, res) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        throw new ApiError(400, "Email and new password are required");
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(404, 'You are not registered with us');
    }

    const isVerified = await OTP.findOne({ email })

    if (!isVerified || !isVerified.isVerify) {
        throw new ApiError(400, "Please verify your email with OTP first");
    }

    user.password = newPassword

    await user.save({ validateBeforeSave: false })

    await OTP.deleteOne({ email })

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
    const { fullName, email, phone, education, answer, about } = req.body;

    if (!fullName && !email && !phone && !education && !answer && !about) {
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
                answer,
                about
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

const getPopularAuthors = asyncHandler(async (req, res) => {
    const popularAuthors = await Blog.aggregate([
        {
            $group: {
                _id: "$author",
                blogCount: { $sum: 1 },
                totalViews: { $sum: "$views" }
            }
        },
        {
            $addFields: {
                popularityScore: {
                    $add: [
                        { $multiply: ["$blogCount", 1.5] },
                        { $divide: ["$totalViews", 200] }
                    ]
                }
            }
        },
        {
            $sort: {
                popularityScore: -1
            }
        },
        {
            $limit: 5
        },
        {
            $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "author"
            }
        },
        {
            $unwind: "$author"
        },
        {
            $project: {
                _id: 0,
                authorId: "$author._id",
                fullName: "$author.fullName",
                email: "$author.email",
                avatar: "$author.avatar",
                about: "$author.about",
                education: "$author.education",
                blogCount: 1,
                totalViews: 1,
                popularityScore: 1
            }
        }
    ]);

    return res.status(200).json(
        new ApiResponse(200, popularAuthors, true, "Popular authors fetched successfully")
    );

});

const blockAndUnblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
        throw new ApiError(404, "User Not Found")
    }

    user.isBlocked = !user.isBlocked

    await user.save({ validateBeforeSave: false })

    return res.status(200).json(
        new ApiResponse(200, { isBlocked: user.isBlocked }, true, `User has been ${user.isBlocked ? "blocked" : "unblocked"}`)
    );
});

export { blockAndUnblockUser, getPopularAuthors, getAllUsers, userRegister, userLogin, userLogout, getCurrentUser, getAllReader, forgotPassword, resetPasswordViaEmailOtp, deleteUser, updateUserDetails, updateUserAvatar, changeCurrentPassword, getAllAuthor };