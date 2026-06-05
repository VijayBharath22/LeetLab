import mongoose from "mongoose";

const problemSolvedScheme = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    problemId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
        required: true,
    },
    passsed:{
        type: Boolean,
        required: true,
    }
},{timestamps: true});

const problemSolvedModel = mongoose.model("ProblemSolved", problemSolvedScheme);

export default problemSolvedModel;