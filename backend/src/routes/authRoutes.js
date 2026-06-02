import express from 'express';
import {
    registerUser,
    verifyEmail,
    loginUser,
    logoutUser,
    refreshToken,
    forgotPassword,
    forgotPasswordToken,
    resetPassword
} from '../controllers/auth.controller.js';
import authValidation from '../middlewares/auth.middleware.js';
import { registerValidation } from '../../validators/auth.validation.js';

const router = express.Router();

router.post('/register', registerValidation, registerUser);
router.get('/verifyEmail/:token', verifyEmail);
router.post('/login',authValidation, loginUser);
router.post('/logout', authValidation, logoutUser);
router.post('/refresh-token', refreshToken);
router.post('/forgot-password', forgotPassword);
router.get("/forgot-password/:token", forgotPasswordToken);
router.post('/reset-password', resetPassword);

export default router;