import { Router } from 'express'
import { getAllMessages, sendMessage } from '../controllers/message.controller.js';

const router = Router()

router.post("/send-message", sendMessage)
router.get("/all-message", getAllMessages)

export default router;