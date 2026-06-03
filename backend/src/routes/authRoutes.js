import express from "express";
import {
  registerUser,
  verifyEmail,
  loginUser,
  logoutUser,
  refreshToken,
  forgotPassword,
  forgotPasswordToken,
  resetPassword,
} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registerValidation,loginValidation } from "../validators/auth.validation.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerValidation(), validate, registerUser);
router.get("/verifyEmail/:token", verifyEmail);
router.post("/login", loginValidation(), validate, loginUser);
router.post("/logout", authMiddleware, logoutUser);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password", forgotPassword);
router.get("/forgot-password/:token", forgotPasswordToken);
router.post("/reset-password", resetPassword);

export default router;
