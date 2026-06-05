import { asyncHandler } from "../utils/async-hander.js";
import Problem from "../models/problem.model.js";
import Submission from "../models/submission.model.js";
import { judge0Pooling, submitBatch } from "../utils/judge0-libs.js";

const submitCode = asyncHandler(async (req, res) => {
  const { languageId, sourceCode, problemId } = req.body;
  const hiddenTestCases = (
    await Problem.findById(problemId).select("hiddenTestCases")
  ).hiddenTestCases;

  //so basically we have to create a submission array which is mapped using the hiddent test cases and gives a custom array with source code , lang id and input output

  const submissions = hiddenTestCases.map((testCase) => {
    return {
      source_code: sourceCode,
      language_id: languageId,
      stdin: testCase.input,
      expected_output: testCase.output,
    };
  });

  //since we have the array ready , we can create a submission POST request to judge0 and get the tokens batch

  const tokens = await submitBatch(submissions);
  console.log(tokens);

  const finalResult = await judge0Pooling(tokens);
  console.log(finalResult);

  
});

export { submitCode };
