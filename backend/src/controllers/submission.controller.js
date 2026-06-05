import User from "../models/user.model.js";
import {asyncHandler} from "../utils/async-hander.js";
import Problem from "../models/problem.model.js";
import Submission from "../models/submission.model.js";

const getAllSubmission = asyncHandler(async (req, res) => {

});

const getSubmissionsForProblem = asyncHandler(async (req, res) => {
    
});

export { getAllSubmission, getSubmissionsForProblem };