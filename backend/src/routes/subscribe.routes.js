import { Router } from "express";
import { verifyJWT, verifyRole } from "../middlewares/auth.meddleware.js";
import { createSubscription, deleteSubscribe, verifySubscription, viewSubscribe } from "../controllers/subscribe.controller.js";

const router = Router()

router.post("/", createSubscription)
router.get("/verify", verifySubscription);
router.get("/view-subscriber", verifyJWT, verifyRole("Admin"), viewSubscribe);
router.delete("/delete-sub/:id", verifyJWT, verifyRole("Admin"), deleteSubscribe)

export default router;