import Blog from "../models/blog.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { sendBlogEmail } from "../utils/email.js";
import asyncHandler from "../utils/asyncHandler.js";
import Subscribe from "../models/subscribe.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { deleteFromCloudinary, getPublicIdFromUrl } from "../utils/deleteFiles.js";

const createBlog = asyncHandler(async (req, res) => {
    const { title, intro, category, sections, published } = req.body;

    if (!title || !intro || !category) {
        throw new ApiError(400, "title, intro and category are required")
    }

    const mainImgLocalPath = req.files?.mainImage[0]?.path;

    if (!mainImgLocalPath) {
        throw new ApiError(400, "main image file is required")

    }

    const mainImage = await uploadOnCloudinary(mainImgLocalPath)

    if (!mainImage) {
        throw new ApiError(500, "main image upload failed");
    }

    const processedSections = [];
    const sectionImages = {};

    for (let i = 0; i < 10; i++) {
        if (req.files[`sectionImages_${i}`]?.[0]) {
            sectionImages[i] = req.files[`sectionImages_${i}`][0];
        }
    }

    const parsedSection = JSON.parse(sections || '[]');

    for (let idx = 0; idx < parsedSection.length; idx++) {
        let imageUrl = "";

        if (sectionImages[idx]) {
            const sectionImage = await uploadOnCloudinary(sectionImages[idx].path);
            imageUrl = sectionImage?.url || "";
        }

        const sectionData = parsedSection[idx] || {};

        processedSections.push({
            title: sectionData.title || "",
            description: sectionData.description || "",
            image: imageUrl
        });
    }

    const blog = await Blog.create({
        title,
        mainImage: mainImage?.url,
        intro,
        sections: processedSections,
        category,
        author: req.user._id,
        published
    })

    const populatedBlog = await Blog.findById(blog._id).populate('author', 'fullName avatar')

    return res.status(200).json(
        new ApiResponse(200, populatedBlog, true, "Blog created successfully")
    );
});

const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, intro, category, sections } = req.body;

    const blog = await Blog.findById(id);

    if (!blog) {
        throw new ApiError(404, "blog not found")
    }

    if (blog.author.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only update your own blog")
    }

    if (title) blog.title = title
    if (intro) blog.intro = intro
    if (category) blog.category = category

    const mainImgLocalPath = req.files?.mainImage?.[0]?.path || null;

    if (mainImgLocalPath) {

        if (blog.mainImage) {
            const publicId = getPublicIdFromUrl(blog.mainImage)
            if (publicId) {
                await deleteFromCloudinary(publicId)
            }
        }

        const mainImage = await uploadOnCloudinary(mainImgLocalPath)

        if (!mainImage?.url) {
            throw new ApiError(400, "Main image upload failed")
        }

        blog.mainImage = mainImage.url;
    }

    const sectionImages = req.files?.sectionImages || [];

    if (sections || sectionImages.length > 0) {
        let updatedSections = blog.sections || [];

        if (sections) {
            try {
                updatedSections = JSON.parse(sections);
            } catch {
                throw new ApiError(400, "Invalid sections format");
            }
        }

        for (let idx = 0; idx < updatedSections.length; idx++) {
            const section = updatedSections[idx];

            if (!blog.sections[idx]) {
                blog.sections[idx] = {};
            }

            let updatedImage = blog.sections[idx]?.image || "";

            const imageField = `sectionImages_${idx}`;
            const sectionFile = req.files?.[imageField]?.[0];

            if (sectionFile) {
                if (updatedImage) {
                    const publicId = getPublicIdFromUrl(updatedImage);
                    if (publicId) await deleteFromCloudinary(publicId);
                }

                const uploaded = await uploadOnCloudinary(sectionFile.path);
                updatedImage = uploaded?.url || updatedImage;
            }

            blog.sections[idx] = {
                title: section?.title || blog.sections[idx]?.title,
                description: section?.description || blog.sections[idx]?.description,
                image: updatedImage,
            };
        }

        blog.sections = blog.sections.filter((_, idx) => updatedSections[idx]);

    }

    const isUpdateProvided = title || intro || category || sections || req.files?.mainImage || req.files?.sectionImages;

    if (!isUpdateProvided) {
        throw new ApiError(400, "No updates provided");
    }

    const updatedBlog = await blog.save()

    return res.status(200).json(
        new ApiResponse(200, updatedBlog, true, "Blog updated successfully")
    )
});

const publishBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { published } = req.body;

    if (typeof published !== 'boolean') {
        throw new ApiError(400, "Invalid 'published' value. Must be true or false.");
    }

    const blog = await Blog.findById(id);

    if (!blog) {
        throw new ApiError(404, "blog not found")
    }

    if (blog.author.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only publish/unpublish your own blog");
    }

    if (published !== undefined) blog.published = published

    const updatedBlog = await blog.save()

    if (published) {
        const blogLink = `${process.env.CORS_ORIGIN}/blog/${updatedBlog._id}`;

        const subscribers = await Subscribe.find({}, { email: 1, _id: 0 })

        const emails = subscribers.map((sub) => sub.email)

        await sendBlogEmail(emails, updatedBlog.title, updatedBlog.intro, blogLink)
    }

    return res.status(200).json(
        new ApiResponse(200, updatedBlog, true, `Blog ${published ? "published" : "unpublished"} successfully`)
    )
});

const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const blog = await Blog.findById(id)

    if (!blog) {
        throw new ApiError(404, "blog not found")
    }

    if (req.user._id.toString() !== blog.author.toString()) {
        throw new ApiError(400, "you can delete only your own blog")
    }

    if (blog.mainImage) {
        const publicId = getPublicIdFromUrl(blog.mainImage)
        if (publicId) {
            await deleteFromCloudinary(publicId)
        }
    }

    if (blog.sections && blog.sections.length > 0) {
        for (let section of blog.sections) {
            if (section.image) {
                const publicId = getPublicIdFromUrl(section.image)
                if (publicId) {
                    await deleteFromCloudinary(publicId)
                }
            }
        }
    }

    await Blog.findByIdAndDelete(id)

    return res.status(200).json(
        new ApiResponse(200, null, true, "Blog deleted successfully")
    )
});

const allBlog = asyncHandler(async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit

    const blogs = await Blog.find({ published: true })
        .skip(skip)
        .limit(limit)
        .populate('author', 'fullName avatar')
        .sort({ createdAt: -1 });

    const totalBlogs = await Blog.countDocuments({ published: true });

    if (!blogs || blogs.length === 0) {
        throw new ApiError(404, "No blogs available")
    }

    const allBlogs = {
        blogs,
        totalPages: Math.ceil(totalBlogs / limit),
        currentPage: page
    }

    return res.status(200).json(
        new ApiResponse(200, allBlogs, true, "All blogs fetched successfully")
    )
});

const singleBlog = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const blog = await Blog.findByIdAndUpdate(
        id,
        { $inc: { views: 1 } },
        { new: true }
    ).populate("author", "fullName email")

    if (!blog) {
        throw new ApiError(404, "blog not found")
    }

    return res.status(200).json(
        new ApiResponse(200, blog, true, "blog fetched successfully")
    )

});

const userBlog = asyncHandler(async (req, res) => {
    const author = req.user._id

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const totalBlogs = await Blog.countDocuments({ author });

    const userBlogs = await Blog.find({ author })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    if (userBlogs.length === 0) {
        throw new ApiError(404, "No blogs found");
    }

    const allUserBlogs = {
        userBlogs,
        totalPages: Math.ceil(totalBlogs / limit),
        currentPage: page
    }

    return res.status(200).json(
        new ApiResponse(200, allUserBlogs, true, "User Blogs Fetched Successfully")
    )
});

const trendingBlog = asyncHandler(async (req, res) => {

    const trendingBlogs = await Blog.find({
        published: true,
        createdAt: {
            $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
    })
        .sort({ views: -1 })
        .limit(7)
        .populate("author", "fullName avatar")
        .select("title intro mainImage category createdAt");

    return res.status(200).json(
        new ApiResponse(200, trendingBlogs, true, "🔥 Trending blogs fetched successfully")
    );
});

export { createBlog, updateBlog, deleteBlog, allBlog, singleBlog, userBlog, publishBlog, trendingBlog };