import { body } from "express-validator";

// VALIDATION RULES FOR UPDATING USER ROLE

export const updateUserRoleValidator = [
  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["admin", "analyst", "viewer"])
    .withMessage("Invalid role")
];