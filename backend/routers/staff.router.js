import express from 'express';
import userAuthentication from '../functions/userAuthentication.js';

import { register, login, logout, sendPasswordResetOTP, resetPassword, changePassword, getMyInfo, isOTPCodesCorrect, validateMyPassword, update } from '../controllers/staff.controller.js';

const router =express.Router();

router.post("/register", userAuthentication, register);
router.post("/login", login);
router.post("/logout", userAuthentication, logout);
router.post("/request-password-reset-code", sendPasswordResetOTP);
router.post("/reset-password", resetPassword);
router.post("/change-password", userAuthentication, changePassword);
router.get("/my-info", userAuthentication, getMyInfo);
router.post("/is-valid-otp", isOTPCodesCorrect);
router.post("/validate-my-password", userAuthentication, validateMyPassword);
router.put("/update-my-account", userAuthentication, update);

export default router;