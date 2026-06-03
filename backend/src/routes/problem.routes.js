import express from "express";
import {    
    getAllProblems,
    getProblemById,
    createProblem,
    updateProblem,
    deleteProblem
} from "../controllers/problem.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createProblemValidation } from "../validators/problem.validation.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.get("/get-all-problems",authMiddleware, getAllProblems);
router.get("/get-problem/:id",authMiddleware, getProblemById);
router.post("/create-problem", createProblemValidation(), validate, authMiddleware, createProblem);
router.put("/update-problem/:id", authMiddleware, updateProblem);
router.delete("/delete-problem/:id", authMiddleware, deleteProblem);

export default router;
