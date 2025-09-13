import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const askAi = asyncHandler(async (req, res) => {

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const { questions } = req.body;

    if (!questions || questions.trim().length === 0) {
        throw new ApiError(400, "Question is required");
    }

    if (questions.length > 500) {
        throw new ApiError(400, "Question too long. Keep it under 500 characters");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(questions);

    const ans = result.response.text();

    if (!ans) {
        throw new ApiError(404, "No response found");
    }

    return res.status(200).json(
        new ApiResponse(200, ans, true, "Answer fetched successfully")
    );
});

export { askAi };