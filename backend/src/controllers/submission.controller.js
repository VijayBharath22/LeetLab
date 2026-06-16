import User from "../models/user.model.js";
import { asyncHandler } from "../utils/async-hander.js";
import Problem from "../models/problem.model.js";
import Submission from "../models/submission.model.js";
import apiResponce from "../utils/api-responce.js";

const getAllSubmission = asyncHandler(async (req, res) => {
  const userid = req.user._id;
  const allSubmissions = await Submission.find({ userId: userid });
  res
    .status(200)
    .json(new apiResponce(200, "All submissions fetched", allSubmissions));
});

const getSubmissionsForProblem = asyncHandler(async (req, res) => {
  const userid = req.user._id;
  const problemId = req.params.problemId;
  const submissions = await Submission.find({
    userId: userid,
    problemId: problemId,
  });
  res
    .status(200)
    .json(
      new apiResponce(
        200,
        "All submissions fetched for the required problem id",
        submissions,
      ),
    );
});

const totalSubmissionsForProblem = asyncHandler(async (req, res) => {
  const problemId = req.params.problemId;
  const totalSubmissions = await Submission.countDocuments({
    problemId,
  });
  res
    .status(200)
    .json(
      new apiResponce(
        200,
        "Total global submissions for the required problem id",
        totalSubmissions,
      ),
    );
});

export {
  getAllSubmission,
  getSubmissionsForProblem,
  totalSubmissionsForProblem,
};
