import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Full Name is required"],
            minLength: [4, "Name must contain at least 4 characters"],
            trim: true
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
            lowercase: true
        },

        message: {
            type: String,
            required: [true, "Message is required"],
            minLength: [10, "Message must contain at least 10 characters"],
            trim: true
        },

        rating: {
            type: Number,
            required: [true, "Rating is required"],
            min: [1, "Rating must be at least 1"],
            max: [5, "Rating cannot exceed 5"],
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
    },
    {
        timestamps: true
    }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
