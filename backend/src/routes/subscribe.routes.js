import { Router } from "express";
import { verifyJWT, verifyRole } from "../middlewares/auth.meddleware.js";
import { createSubscription, deleteSubscribe, verifySubscription, viewSubscribe } from "../controllers/subscribe.controller.js";

const router = Router()

router.post("/", createSubscription)
router.get("/verify", verifySubscription);
router.get("/view-subscriber", verifyJWT, verifyRole("SuparAdmin"), viewSubscribe);
router.delete("/delete-sub/:id", verifyJWT, verifyRole("SuparAdmin"), deleteSubscribe)

export default router;