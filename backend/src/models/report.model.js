import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
    {
        reportedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        blog: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog",
            required: true
        },

        reason: {
            type: String,
            required: true
        }

    },

    {
        timestamps: true
    }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;