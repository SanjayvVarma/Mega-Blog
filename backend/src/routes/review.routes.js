import { Router } from "express";
import { createReview, deleteReview, getAllReview } from "../controllers/review.controller.js";
import { verifyJWT } from "../middlewares/auth.meddleware.js";

const router = Router()

router.post("/create-review", verifyJWT, createReview);
router.get("/all-review", verifyJWT, getAllReview);
router.delete("/delete-review/:id", verifyJWT, deleteReview)

export default router;