import mongoose from 'mongoose';

const hitSchema = new mongoose.Schema(
    {
        count: {
            type: Number,
            default: 0
        }
    }
);

const Hit = mongoose.model("Hit", hitSchema);

export default Hit;