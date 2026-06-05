import mongooose from "mongoose";

const testCaseResultSchema = new mongoose.Schema({
    questionId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Problem",
        required:true
    },
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    input:String,
    expected_output:String,
    status: {
        code: Number,
        message: String,
    },
    output:String,
    timeTaken: Number,
    memoryUsed: Number
},{timestamps:true});

const testCaseResultModel = mongoose.model("TestCaseResult", testCaseResultSchema);

export default testCaseResultModel;