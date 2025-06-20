import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import { verifyJWT, verifyRole } from "../middlewares/auth.meddleware.js";
import { getAllUsers, getCurrentUser, userLogin, userLogout, userRegister, forgotPassword, deleteUser, updateUserDetails, updateUserAvatar, changeCurrentPassword, getAllAuthor, resetPasswordViaEmailOtp, getAllReader, getPopularAuthors, blockAndUnblockUser } from "../controllers/user.controller.js";

const router = Router();

const uploadImage = upload.fields([
    { name: 'avatar', maxCount: 1 }
])

router.post("/register", uploadImage, userRegister);
router.post("/login", userLogin);
router.post("/logout", verifyJWT, userLogout);
router.get("/current-user", verifyJWT, getCurrentUser);
router.get("/all-users", verifyJWT, verifyRole("Admin"), getAllUsers);
router.get("/all-readers", getAllReader);
router.get("/all-author", getAllAuthor);
router.get("/popular-author", getPopularAuthors);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPasswordViaEmailOtp);
router.delete("/delete-user/:id", deleteUser);
router.patch("/update-details", verifyJWT, updateUserDetails);
router.patch("/change-password", verifyJWT, changeCurrentPassword);
router.patch("/update-avatar", verifyJWT, upload.single("avatar"), updateUserAvatar);
router.patch("/block-unblock/:id", verifyJWT, verifyRole("Admin"), blockAndUnblockUser)

export default router;