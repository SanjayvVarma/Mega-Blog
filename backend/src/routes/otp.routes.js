import { Router } from 'express';
import { sendOtpForRegister, sendOtpForResetPassword, verifyOtp } from '../controllers/otp.controller.js';

const router = Router();

router.post('/send-otp-register', sendOtpForRegister)
router.post('/send-otp-reset', sendOtpForResetPassword)
router.post('/verify-otp', verifyOtp)

export default router;