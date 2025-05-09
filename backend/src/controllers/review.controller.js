import Review from "../models/review.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const createReview = asyncHandler(async (req, res) => {

    const { fullName, email, message } = req.body;

    if (!fullName || !email || !message) {

        throw new ApiError(400, "All Fields are required")

    }

    const review = await Review.create({
        fullName,
        email,
        message,
        createdBy: req.user._id,
    });

    return res.status(201).json(
        new ApiResponse(201, review, true, "review created successfully")
    )
});

const getAllReview = asyncHandler(async (req, res) => {

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const skip = (page - 1) * limit

    const reviews = await Review.find().skip(skip).limit(limit)

    if (!reviews || reviews.length === 0) {
        throw new ApiError(404, "No Review Found")
    }

    const totalReview = await Review.countDocuments()

    const allReviews = {
        reviews,
        totalPages: Math.ceil(totalReview / limit),
        currentPage: page
    }

    return res.status(200).json(
        new ApiResponse(200, allReviews, true, "All reviews fetched successfully")
    )
});


const deleteReview = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const review = await Review.findById(id)

    if (!review) {
        throw new ApiError(404, "REVIEW NOT FOUND")
    }

    if (review.createdBy.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this review")
    }

    await Review.findByIdAndDelete(id)

    return res.status(200).json(
        new ApiResponse(200, null, true, "review deleted successfully ")
    )
});

export { createReview, getAllReview, deleteReview }