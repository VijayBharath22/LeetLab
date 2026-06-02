import { body } from "express-validator";

const registerValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .exists()
    .withMessage("Email already in use"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
];

export { registerValidation };
