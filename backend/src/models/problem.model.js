const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: difficultyLevels,
      required: true,
    },
    tags: [String],
    exampleTestCases: [
      {
        input: String,
        output: String,
        explanation: String,
      },
    ],
    constraints: String,
    hints: [String],
    hiddenTestCases: [
      {
        input: String,
        output: String,
      },
    ],
    starterCode: [
      {
        language: String,
        code: String,
      },
    ],
    referenceSolutions: [
      {
        language: String,
        code: String,
      },
    ],

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const problemModel = mongoose.model("Problem", problemSchema);
