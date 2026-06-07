import mongoose from "mongoose";
import { verdict } from "../utils/constants.js";

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
    timeTaken: String,
    memoryUsed: String,
    status: String,
    languageId: Number,
    sourceCode: String,
    compileOutput: String,
    stderr: String,
    stdout: String,
    stdin: String,
    expected_output: String,
    token: JSON,
    verdict: verdict,
  },
  { timestamps: true },
);

const submissionModel = mongoose.model("Submission", submissionSchema);

export default submissionModel;
