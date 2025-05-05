import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        },

        password: {
            type: String,
            required: true,
            minlength: [6, 'Password must be at least 6 characters long'],
            trim: true,
            select: false,
            match: [/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'Must include A-Z, a-z, 0-9 & special char']
        },

        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [/^[6-9][0-9]{9}$/, 'Please enter a valid 10-digit phone number']

        },

        about: {
            type: String,
            maxLength: [60, "About section must not exceed 30 characters"]
        },

        answer: {
            type: String,
            required: true,
        },

        education: {
            type: String,
            required: true,
            enum: ["SSC", "INTERMEDIATE", "GRADUATION", "POST GRADUATION", "PhD", "OTHER"]
        },

        role: {
            type: String,
            required: true,
            enum: ["Reader", "Admin"]
        },

        avatar: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
});

userSchema.methods.comparePassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


const User = mongoose.model('User', userSchema);

export default User;

