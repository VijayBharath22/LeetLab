import express from "express";
import {executeCode} from "../controllers/execute-code.controller.js"
import {authMiddleware} from "../middlewares/auth.middleware.js"

const router = express.Router();

router.post("/execute-code",authMiddleware, executeCode)

export default router;
