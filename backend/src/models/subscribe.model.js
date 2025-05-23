import mongoose from "mongoose";

const subscribeSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        },
        
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Subscribe = mongoose.model("Subscribe", subscribeSchema);
export default Subscribe;