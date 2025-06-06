import { Router } from 'express'
import { verifyJWT, verifyRole } from '../middlewares/auth.meddleware.js';
import { getAllMessages, replyToMessage, sendMessage } from '../controllers/message.controller.js';

const router = Router()

router.post("/send-message", sendMessage);
router.get("/all-message", verifyJWT, verifyRole("Admin"), getAllMessages);
router.post("/send-reply/:id", verifyJWT, verifyRole("Admin"), replyToMessage);

export default router;