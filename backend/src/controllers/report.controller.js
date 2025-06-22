import Blog from "../models/blog.model.js";
import ApiError from "../utils/ApiError.js";
import Report from "../models/report.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const reportBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params;
    const { reason } = req.body;
    const userId = req.user._id;

    const blog = await Blog.findById(blogId);
    if (!blog) {
        throw new ApiError(404, "Blog not found.");
    }

    if (!reason || reason.trim() === "") {
        throw new ApiError(400, "Reason is required.");
    }

    const alreadyReported = await Report.findOne({ blog: blogId, reportedBy: userId });
    if (alreadyReported) {
        throw new ApiError(400, "You have already reported this blog.");
    }

    const report = await Report.create({
        reportedBy: userId,
        blog: blogId,
        reason
    });

    if (!report) {
        throw new ApiError(400, "Failed to create report.");
    }

    return res.status(201).json(
        new ApiResponse(201, report, true, "Blog reported successfully.")
    );
});

const getAllReports = asyncHandler(async (req, res) => {

});

const getBlogReport = asyncHandler(async (req, res) => {

});

export { reportBlog, getAllReports, getBlogReport };