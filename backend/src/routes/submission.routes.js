import express from "express";
import {
  getAllSubmission,
  getSubmissionsForProblem,
} from "../controllers/submission.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const submissionRoutes = express.Router();

submissionRoutes.get("/get-all-submissions", authMiddleware, getAllSubmission);
submissionRoutes.get(
  "/get-submission/:problemId",
  authMiddleware,
  getSubmissionsForProblem,
);

export default submissionRoutes;
