import { body } from "express-validator";

const createProblemValidation = () => {
  return [
    body("questionId").trim().notEmpty().withMessage("QuestionId is required"),
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 3, max: 30 })
      .withMessage("Title must be between 3 and 30 characters"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required")
      .isLength({ min: 3, max: 1000 })
      .withMessage("Description must be between 3 and 1000 characters"),
    body("difficulty")
      .trim()
      .notEmpty()
      .withMessage("Difficulty is required")
      .isIn(difficultyLevels)
      .withMessage("Difficulty must be easy, medium or hard"),
    body("tags").isArray().withMessage("Tags must be an array"),
    body("exampleTestCases")
      .isArray()
      .withMessage("Example Test Cases must be an array"),
    body("constraints").notEmpty().withMessage("Constraints is required"),
    body("hints").isArray().withMessage("Hints must be an array"),
    body("hiddenTestCases")
      .isArray()
      .withMessage("Hidden Test Cases must be an array"),
    body("starterCode").notEmpty().withMessage("Starter Code is required"),
    body("referenceSolutions")
      .notEmpty()
      .withMessage("Reference Solutions is required"),
  ];
};
