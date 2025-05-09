import Comment from "../models/comment.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import Blog from "../models/blog.model.js"

const addComment = asyncHandler(async (req, res) => {
    const { blogId } = req.params;
    const { message } = req.body;

    if (!message) {
        throw new ApiError(400, "Comment message is required");
    }

    const comment = await Comment.create({
        blog: blogId,
        user: req.user._id,
        message: message.trim()
    })

    res.status(201).json(
        new ApiResponse(201, comment, true, "Comment created successfully")
    );
});

const allComment = asyncHandler(async (req, res) => {
    const { blogId } = req.params;

    if (!blogId) {
        throw new ApiError(404, "Blog not Found")
    }

    const comments = await Comment.find({ blog: blogId })
        .populate("user", "fullName email")
        .sort({ createdAt: -1 });

    if (!comments || comments.length === 0) {
        throw new ApiError(404, "No comments found for this blog");
    }

    res.status(200).json(
        new ApiResponse(200, comments, true, "All Comment Fetched")
    )

});

const deleteComment = asyncHandler(async (req, res) => {
    const { blogId, id: commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    const currentUserId = req.user._id.toString();
    const commentOwnerId = comment.user.toString();
    const blogAuthorId = blog.author.toString();

    if (currentUserId !== commentOwnerId && currentUserId !== blogAuthorId) {
        throw new ApiError(403, "You are not authorized to delete this comment");
    }

    await comment.deleteOne();

    res.status(200).json(
        new ApiResponse(200, null, true, "Comment deleted successfully")
    );
});



export { addComment, allComment, deleteComment }