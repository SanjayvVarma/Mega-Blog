import { Router } from "express";
import { createSubscription, verifySubscription } from "../controllers/subscribe.controller.js";

const router = Router()

router.post("/", createSubscription)
router.get("/verify", verifySubscription);

export default router;