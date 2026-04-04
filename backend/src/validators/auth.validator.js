import { body } from "express-validator";

// VALIDATION RULES FOR USER REGISTRATION AND LOGIN REQUESTS

export const registerValidator = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 8 })
    .withMessage(
      "Password must be at least 8 characters long"
    )
    .matches(/[A-Z]/)
    .withMessage(
      "Password must contain at least one uppercase letter"
    )
    .matches(/[a-z]/)
    .withMessage(
      "Password must contain at least one lowercase letter"
    )
    .matches(/[0-9]/)
    .withMessage(
      "Password must contain at least one number"
    )
    .matches(/[^A-Za-z0-9]/)
    .withMessage(
      "Password must contain at least one special character"
    )
];

export const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
];