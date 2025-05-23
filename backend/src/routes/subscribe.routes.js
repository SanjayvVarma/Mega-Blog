import { Router } from "express";
import { verifyJWT, verifyRole } from "../middlewares/auth.meddleware.js";
import { createSubscription, verifySubscription, viewSubscribe } from "../controllers/subscribe.controller.js";

const router = Router()

router.post("/", createSubscription)
router.get("/verify", verifySubscription);
router.get("/view-subscriber", verifyJWT, verifyRole("Admin"), viewSubscribe);

export default router;