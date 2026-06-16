import { asyncHandler } from "../utils/async-hander.js";
import Problem from "../models/problem.model.js";
import Submission from "../models/submission.model.js";
import { judge0Pooling, submitBatch } from "../utils/judge0-libs.js";
import { statusEnum } from "../utils/constants.js";
import ProblemSolved from "../models/problemSolved.model.js";
import apiResponce from "../utils/api-responce.js";
import testCaseResult from "../models/testCaseResults.model.js";

const runCode = asyncHandler(async (req, res) => {
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
    };
  });

  //since we have the array ready , we can create a submission POST request to judge0 and get the tokens batch

  const tokens = await submitBatch(submissions);
  console.log(tokens);

  const finalResult = await judge0Pooling(tokens);
  console.log(finalResult);

  //now we have to go to each of the test case result in final result and store them in the testcaseresult table

  //first store them in the submissions table then use that _id to store eahc of the test cases in the testcaseresult table
  let allPassed = true;

  const finalResults = finalResult.map((testCaseResult, i) => {
    const stdout = testCaseResult.stdout;
    const expected_output = hiddenTestCases[i].output;
    const passed = stdout === expected_output;

    if (!passed) allPassed = false;

    return {
      testcase: i + 1,
      passed: passed,
      stdin: hiddenTestCases[i].input,
      status: testCaseResult.status.description,
      compile_output: testCaseResult.compile_output,
      expected_output: hiddenTestCases[i].output,
      time: testCaseResult.time,
      memory: testCaseResult.memory,
      stderr: testCaseResult.stderr,
    };
  });

  console.log(finalResults);

  const stdin = hiddenTestCases.map((r) => r.input);
  const stdout = hiddenTestCases.map((r) => r.output);

  console.log(stdin);

  const submission = await Submission.create({
    userId: req.user._id,
    problemId,
    languageId,
    sourceCode,
    timeTaken: finalResults.some((r) => r.time > 0)
      ? JSON.stringify(finalResults.map((r) => r.time))
      : null,
    memoryUsed: finalResults.some((r) => r.memory > 0)
      ? JSON.stringify(finalResults.map((r) => r.memory))
      : null,
    status: finalResults.every((r) => r.passed)
      ? statusEnum.ACCEPTED
      : statusEnum.WRONG_ANSWER,
    compileOutput: finalResults.some((r) => r.compile_output)
      ? JSON.stringify(finalResults.map((r) => r.compile_output))
      : null,
    stdin: stdin.join("\n"),
    stdout: JSON.stringify(finalResult.map((r) => r.stdout)),
    expected_output: stdout.join("\n"),
    token: tokens,
    stderr: finalResults.some((r) => r.stderr)
      ? JSON.stringify(finalResults.map((r) => r.stderr))
      : null,
    verdict: allPassed ? statusEnum.ACCEPTED : statusEnum.WRONG_ANSWER,
  });

  if (allPassed) {
    const problemSolved = await ProblemSolved.findOneAndUpdate(
      {
        userId: req.user._id,
        problemId,
      },
      {
        userId: req.user._id,
        problemId,
      },
      {
        upsert: true,
        new: true,
      },
    );
  }

  const testCaseResults = finalResults.map((finalResult) => {
    return {
      testCase: finalResult.testcase,
      submissionId: submission._id,
      stdin: finalResult.stdin,
      expected_output: finalResult.expected_output,
      status: finalResult.status,
      stdout: finalResult.stdout,
      compile_output: finalResult.compile_output,
      time: finalResult.time,
      memory: finalResult.memory,
      passed: finalResult.expected_output === finalResult.stdout,
    };
  });

  console.log(testCaseResults);
  await testCaseResult.insertMany(testCaseResults);

  return res
    .status(200)
    .json(new apiResponce(200, "Code submitted successfully"));
});

export { runCode };
