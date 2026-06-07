import mongoose from "mongoose";

const testCaseResultSchema = new mongoose.Schema(
  {
    submissionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Submission",
      required: true,
    },
    testCase:Number,
    stdin: String,
    stdout:String,
    expected_output: String,
    status: String,
    passed:Boolean,
    stdout: String,
    compile_output: String,
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
