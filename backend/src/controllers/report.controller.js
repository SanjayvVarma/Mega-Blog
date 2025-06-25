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

const getBlogsReport = asyncHandler(async (req, res) => {

    const blogs = await Blog.find({}).select("title author mainImage createdAt").populate("author", "fullName email");

    const reports = await Report.find({}).select("blog reason").lean();

    const totalReportCount = reports.length;

    if (!reports || reports.length === 0) {
        throw new ApiError(404, "No Report found")
    }

    const reportMap = {}

    for (const report of reports) {
        const blogId = report.blog.toString();
        const reportReasons = report.reason;

        if (!reportMap[blogId]) {
            reportMap[blogId] = {
                totalReports: 0,
                reasons: {}
            }
        }

        reportMap[blogId].totalReports += 1;
        reportMap[blogId].reasons[reportReasons] = (reportMap[blogId].reasons[reportReasons] || 0) + 1
    }

    const allBlogsReports = blogs.map((blog) => {
        const reportInfo = reportMap[blog._id.toString()];
        if (!reportInfo) return null;

        return {
            blogId: blog._id,
            title: blog.title,
            mainImage: blog.mainImage,
            createdAt: blog.createdAt,
            author: blog.author,
            totalReports: reportInfo.totalReports,
            reasonsBreakdown: reportInfo.reasons,
        };

    }).filter(Boolean);

    return res.status(200).json(
        new ApiResponse(200, { allBlogsReports, totalReportCount }, true, "All reports fetched successfully")
    )

});

const deleteReport = asyncHandler(async (req, res) => {
    const { blogId, reason } = req.body;

    if (!blogId || !reason) {
        throw new ApiError(400, "Blog ID and reason are required");
    }

    const result = await Report.deleteMany({ blog: blogId, reason });

    return res.status(200).json(
        new ApiResponse(200, null, true, `${result.deletedCount} reports deleted`)
    );
});

export { reportBlog, getBlogsReport, deleteReport };