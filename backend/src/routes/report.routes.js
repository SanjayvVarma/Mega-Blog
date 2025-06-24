import { Router } from "express";
import { verifyJWT, verifyRole } from "../middlewares/auth.meddleware.js";
import { reportBlog, getBlogsReport } from "../controllers/report.controller.js";

const router = Router();

router.post("/blog/:blogId", verifyJWT, reportBlog);
router.get("/getblog-report", verifyJWT, verifyRole("Admin"), getBlogsReport);

export default router;