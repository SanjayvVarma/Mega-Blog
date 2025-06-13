import { Router } from 'express'
import { verifyJWT, verifyRole } from '../middlewares/auth.meddleware.js';
import { getAllMessages, replyToMessage, sendMessage } from '../controllers/message.controller.js';

const router = Router()

router.post("/send-message", sendMessage);
router.get("/all-message", verifyJWT, verifyRole("SuparAdmin"), getAllMessages);
router.post("/send-reply/:id", verifyJWT, verifyRole("SuparAdmin"), replyToMessage);

export default router;