[
  {
    source_code:
      'const fs = require("fs");\nconst input = fs.readFileSync(0, "utf8").trim();\nconst [a, b] = input.split(" ").map(Number);\nconsole.log(a + b);',
    language_id: 63,
    stdin: "3 7",
    expected_output: "10",
  },

  {
    stdout: "10\n",
    time: "0.086",
    memory: 33800,
    stderr: null,
    token: "884154e6-bbb8-4bd7-9e85-bf5b52fc4bf9",
    compile_output: null,
    message: null,
    status: { id: 3, description: "Accepted" },
  },

  {
    source_code:
      'const fs = require("fs");\nconst input = fs.readFileSync(0, "utf8").trim();\nconst [a, b] = input.split(" ").map(Number);\nconsole.log(a - b);',
    language_id: 63,
    stdin: "3 7",
    expected_output: "10",
  },
  {
    stdout: "-4\n",
    time: "0.053",
    memory: 7104,
    stderr: null,
    token: "f6312b50-0ead-46ed-8ee9-6c6f6a7b2d28",
    compile_output: null,
    message: null,
    status: { id: 4, description: "Wrong Answer" },
  },
];
