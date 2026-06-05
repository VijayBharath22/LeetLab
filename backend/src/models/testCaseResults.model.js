import mongoose from "mongoose";

const testCaseResultSchema = new mongoose.Schema(
  {
    submissionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Submission",
      required: true,
    },
    stdin: String,
    expected_output: String,
    status: {
      id: Number,
      description: String,
    },
    stdout: String,
    compile_output: String,
    message: String,
    time: Number,
    memory: Number,
  },
  { timestamps: true },
);

const testCaseResultModel = mongoose.model(
  "TestCaseResult",
  testCaseResultSchema,
);

export default testCaseResultModel;
