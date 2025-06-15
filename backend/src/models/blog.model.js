import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        mainImage: {
            type: String,
            required: true
        },

        intro: {
            type: String,
            required: true,
            minLength: [50, "Blog intro must contain at least 50 characters"]
        },

        sections: [
            {
                title: { type: String },
                image: { type: String },
                description: { type: String }
            }
        ],

        category: {
            type: String,
            required: true,
            enum: ["Technology", "Health", "Lifestyle", "Education", "Business", "Sports", "Others"]
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        published: {
            type: Boolean,
            default: false
        },

        views: {
            type: Number,
            default: 0
        },
        
    },

    {
        timestamps: true
    }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;