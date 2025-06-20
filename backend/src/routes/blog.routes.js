import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import { verifyJWT, verifyRole } from "../middlewares/auth.meddleware.js";
import { createBlog, updateBlog, deleteBlog, allBlog, singleBlog, userBlog, publishBlog, trendingBlog } from "../controllers/blog.controller.js";

const router = Router();

const uploadImages = upload.fields([
    { name: "mainImage", maxCount: 1 },
    ...Array.from({ length: 10 }, (_, i) => (
        { name: `sectionImages_${i}`, maxCount: 1 }
    ))
])

router.post("/create-blog", verifyJWT, verifyRole("Author"), uploadImages, createBlog);
router.patch("/update-blog/:id", verifyJWT, verifyRole("Author"), uploadImages, updateBlog);
router.delete("/delete-blog/:id", verifyJWT, verifyRole("Author"), deleteBlog);
router.patch("/publish-blog/:id", verifyJWT, verifyRole("Author"), publishBlog);
router.get("/all-blogs", allBlog);
router.get("/trending-blogs", trendingBlog);
router.get("/single-blog/:id", singleBlog);
router.get("/user-blogs", verifyJWT, userBlog);

export default router;