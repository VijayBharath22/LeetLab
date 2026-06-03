import { body } from "express-validator";

const registerValidation = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ];
};

const loginValidation = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ];
}

const resetPasswordValidation = () => {
  return [
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ];
}

const forgetPassowrdValidation = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Valid email is required"),
  ];
}


export { registerValidation, loginValidation, resetPasswordValidation, forgetPassowrdValidation };
