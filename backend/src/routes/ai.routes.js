import { Router } from "express";
import { askAi } from "../controllers/ai.controller.js";

const router = Router();

router.post("/ask", askAi);

export default router;