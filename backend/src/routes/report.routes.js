import { Router } from "express";
import { verifyJWT, verifyRole } from "../middlewares/auth.meddleware.js";
import { reportBlog, getBlogsReport, deleteReport } from "../controllers/report.controller.js";

const router = Router();

router.post("/blog/:blogId", verifyJWT, reportBlog);
router.get("/getblog-report", verifyJWT, verifyRole("Admin"), getBlogsReport);
router.delete("/delete-report", verifyJWT, verifyRole("Admin"), deleteReport);

export default router;