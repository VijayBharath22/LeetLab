import { validationResult } from "express-validator";
import apiError from "../utils/api-error.js";
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  console.log(errors);
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));
  console.log(extractedErrors);
  throw new apiError(422, "Validation Error", extractedErrors);
};

export { validate };
