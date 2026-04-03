import { body } from "express-validator";
import { AVAILABLE_RECORD_TYPES } from "../constants/roles.js";

export const createRecordValidator =  [
  body().isArray({ min: 1 }).withMessage("Body must be an array"),

  body("*.amount")
    .notEmpty()
    .isNumeric()
    .withMessage("Amount must be a number"),

  body("*.type")
    .isIn(AVAILABLE_RECORD_TYPES)
    .withMessage("Invalid record type"),

  body("*.category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),

  body("*.date")
    .isISO8601()
    .withMessage("Valid date is required"),

  body("*.notes")
    .optional()
    .isString()
];




export const updateRecordValidator = [
  body("amount")
    .optional()
    .isNumeric()
    .withMessage("Amount must be a number"),

  body("type")
    .optional()
    .isIn(["INCOME", "EXPENSE"])
    .withMessage(
      "Type must be either INCOME or EXPENSE"
    ),

  body("category")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Category cannot be empty"),

  body("date")
    .optional()
    .isISO8601()
    .withMessage("Date must be valid"),

  body("notes")
    .optional()
    .isString()
    .withMessage("Notes must be text")
];