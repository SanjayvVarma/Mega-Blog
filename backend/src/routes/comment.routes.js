import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.meddleware.js";
import { addComment, allComment, deleteComment } from "../controllers/comment.controller.js";

const router = Router()

router.route('/:blogId').post(verifyJWT, addComment).get(allComment)
router.delete('/:blogId/comment/:id', verifyJWT, deleteComment)

export default router;