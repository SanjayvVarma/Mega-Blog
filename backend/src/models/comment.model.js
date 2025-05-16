import mongoose from "mongoose"

const commentSchema = new mongoose.Schema(
    {
        blog: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog',
            required: true
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        message: {
            type: String,
            required: true,
            trim: true,
            maxLength: 300,
        }

    },

    {
        timestamps: true
    }
)

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;