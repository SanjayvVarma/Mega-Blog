import { Router } from "express";
import { verifyJWT, verifyRole } from "../middlewares/auth.meddleware.js";
import { reportBlog, getBlogReport } from "../controllers/report.controller.js";

const router = Router();

router.post("/blog/:blogId", verifyJWT, reportBlog);
router.post("/getblog-report/:blogId", verifyJWT, verifyRole("Admin"), getBlogReport);

export default router;