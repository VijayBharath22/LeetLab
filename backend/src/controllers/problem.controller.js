import User from "../models/user.model.js";
import Problem from "../models/problem.model.js";
import { asyncHandler } from "../utils/async-hander.js";
import { userRolesEnum } from "../utils/constants.js";

const getAllProblems = asyncHandler(async (req, res) => {
  //basically get all the problems(only title and questionId and tags and difficultylevels) created by anyone and send it to the frontend by sorting it in questionId order
  const problems = await Problem.find()
    .sort({ questionId: 1 })
    .select("questionId title tags difficulty");
  if (problems.length === 0) {
    return res.status(404).json({ message: "No problems found" });
  }

  res.status(200).json(problems);
});

const getProblemById = asyncHandler(async (req, res) => {
  const problem = await Problem.findById(req.params.id).select(
    "-hiddenTestCases -referenceSolutions",
  );
  if (!problem) {
    return res.status(404).json({ message: "Problem not found" });
  }
  res.status(200).json(problem);
});

const createProblem = asyncHandler(async (req, res) => {
  if (req.user.role !== userRolesEnum.ADMIN) {
    return res.status(403).json({ message: "Only admin can create problems" });
  }
  const existingProblem = await Problem.findOne({
    questionId: req.body.questionId,
  });
  if (existingProblem) {
    return res.status(400).json({ message: "Problem already exists" });
  }
  const {
    questionId,
    title,
    description,
    difficulty,
    tags,
    exampleTestCases,
    constraints,
    hints,
    hiddenTestCases,
    starterCode,
    referenceSolutions,
  } = req.body;
  const problem = new Problem({
    questionId,
    title,
    description,
    difficulty,
    tags,
    exampleTestCases,
    constraints,
    hints,
    hiddenTestCases,
    starterCode,
    referenceSolutions,
    userId: req.user.id,
  });
  await problem.save();
  res.status(201).json({ message: "Problem created successfully", problem });
});

const updateProblem = asyncHandler(async (req, res) => {
  if (req.user.role !== userRolesEnum.ADMIN) {
    return res.status(403).json({ message: "Only admin can update problems" });
  }

  const problem = await Problem.findById(req.params.id);
  if (!problem) {
    return res.status(404).json({ message: "Problem not found" });
  }
  const updatedProblem = await Problem.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true },
  );
  res
    .status(200)
    .json({ message: "Problem updated successfully", updateProblem });
});

const deleteProblem = asyncHandler(async (req, res) => {
  if (req.user.role !== userRolesEnum.ADMIN) {
    return res.status(403).json({ message: "Only admin can delete problems" });
  }

  const problem = await Problem.findById(req.params.id);
  if (!problem) {
    return res.status(404).json({ message: "Problem not found" });
  }
  await Problem.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Problem deleted successfully" });
});

export {
  getAllProblems,
  getProblemById,
  createProblem,
  updateProblem,
  deleteProblem,
};
