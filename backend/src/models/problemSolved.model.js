import mongoose from "mongoose";

const problemSolvedSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  },
);

problemSolvedSchema.index({ userId: 1, problemId: 1 }, { unique: true });

const problemSolvedModel = mongoose.model("ProblemSolved", problemSolvedSchema);

export default problemSolvedModel;
