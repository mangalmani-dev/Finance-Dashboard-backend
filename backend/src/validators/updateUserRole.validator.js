import { body } from "express-validator";

export const updateUserRoleValidator = [
  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["admin", "analyst", "viewer"])
    .withMessage("Invalid role")
];