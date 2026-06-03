import express from "express";
import {
  registerUser,
  verifyEmail,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registerValidation,loginValidation, resetPasswordValidation, forgetPassowrdValidation } from "../validators/auth.validation.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerValidation(), validate, registerUser);
router.get("/verifyEmail/:token", verifyEmail);
router.post("/login", loginValidation(), validate, loginUser);
router.post("/logout", authMiddleware, logoutUser);
router.post("/forgot-password", forgetPassowrdValidation(), validate, forgotPassword);
router.post("/reset-password/:token",resetPasswordValidation(), validate, resetPassword);

export default router;
