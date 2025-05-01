import express from "express";
import { config } from 'dotenv';
import cors from 'cors';
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

app.get('/api/v1/', (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Welcome to SK Blog API"
    });
});

// routes

import userRouter from "./routes/user.routes.js";
import blogRouter from "./routes/blog.routes.js";
import reviewRouter from "./routes/review.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/review", reviewRouter)

app.use((req, res) => {
    return res.status(404).json({
        success: false,
        message: "Route not found"
    });
});


app.use(errorMiddleware);

export default app;