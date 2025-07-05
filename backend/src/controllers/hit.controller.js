import Hit from "../models/hit.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const countHit = asyncHandler(async (req, res) => {
    await Hit.findOneAndUpdate({}, { $inc: { count: 1 } }, { upsert: true })
});

const totalHits = asyncHandler(async (req, res) => {
    const visits = await Hit.findOne({});

    if (!visits) {
        throw new ApiError(404, "No hits available");
    }

    return res.status(200).json(
        new ApiResponse(200, visits, true, "Total hits fetched")
    )
});

export { countHit, totalHits };