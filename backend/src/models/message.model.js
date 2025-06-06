import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        },

        message: [
            {
                type: String,
                required: true,
                trim: true
            }
        ]
    },

    { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;