import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.meddleware.js";
import { getAllusers, getCurrentUser, userLogin, userLogout, userRegister, forgotPassword, deleteUser, updateUserDetails, updateUserAvatar, changeCurrentPassword, getAllAdmin, resetPasswordViaEmailOtp } from "../controllers/user.controller.js";

const router = Router();

const uploadImage = upload.fields([
    { name: 'avatar', maxCount: 1 }
])

router.post("/register", uploadImage, userRegister);
router.post("/login", userLogin);
router.post("/logout", verifyJWT, userLogout);
router.get("/current-user", verifyJWT, getCurrentUser);
router.get("/all-users", getAllusers);
router.get("/all-admin", getAllAdmin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPasswordViaEmailOtp);
router.delete("/delete-user/:id", deleteUser);
router.patch("/update-details", verifyJWT, updateUserDetails);
router.patch("/change-password", verifyJWT, changeCurrentPassword);
router.patch("/update-avatar", verifyJWT, upload.single("avatar"), updateUserAvatar);

export default router;