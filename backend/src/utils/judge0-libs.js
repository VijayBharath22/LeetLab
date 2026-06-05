import axios from "axios";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const submitBatch = async (submissions) => {
  const tokenResult = await axios.post(
    `${process.env.JUDGE0_URL}/submissions/batch?base64_encoded=false&wait=false`,
    { submissions },
  );
  const tokensArray = tokenResult.data;
  const tokens = tokensArray.map((token) => token.token);
  return tokens;
};

const judge0Pooling = async (tokens) => {
  while (true) {
    const { data } = await axios.get(
      `${process.env.JUDGE0_URL}/submissions/batch`,
      {
        params: {
          tokens: tokens.join(","),
          base64_encoded: false,
        },
      },
    );
    //if any one of the test case result status is also 1 or 2 then poll it again

    const testCaseResults = data.submissions;

    if (
      testCaseResults.every(
        (testCaseResult) =>
          testCaseResult.status.id !== 1 && testCaseResult.status.id !== 2,
      )
    ) {
      return testCaseResults;
    }
    await sleep(1000);
  }
};

export { submitBatch, judge0Pooling };
