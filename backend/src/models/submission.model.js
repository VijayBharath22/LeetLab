
const submissionSchema = new mongoose.Schema({
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
    timeTaken: Number,
    memoryUsed: Number,
    status: {
        code: Number,
        message: String,
    },
    language: {
        code: String,
        name: String,
    },
    sourceCode: String,
    compileOutput: String,
    stderr: String,
    stdout: String,
    stdin: String,
    token: String,
}, { timestamps: true });

const submissionModel = mongoose.model("Submission", submissionSchema);
    