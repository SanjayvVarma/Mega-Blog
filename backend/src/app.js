import cors from 'cors';
import express from "express";
import { config } from 'dotenv';
import cookieParser from "cookie-parser";

const app = express();

config({ path: './.env' });

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: '20kb' }))

app.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Welcome to SK Blog API"
    });
});

// routes

import otpRouter from "./routes/otp.routes.js";
import hitRouter from "./routes/hit.routes.js";
import userRouter from "./routes/user.routes.js";
import blogRouter from "./routes/blog.routes.js";
import reportRouter from "./routes/report.routes.js";
import reviewRouter from "./routes/review.routes.js";
import messageRouter from "./routes/message.routes.js";
import commentRouter from "./routes/comment.routes.js";
import subscribeRouter from "./routes/subscribe.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

app.use("/api/v1/otp", otpRouter);
app.use("/api/v1/hit", hitRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/report", reportRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/subscribe", subscribeRouter);

app.use((req, res) => {
    return res.status(404).json({
        success: false,
        message: "Route not found"
    });
});
app.use(errorMiddleware);

export default app;