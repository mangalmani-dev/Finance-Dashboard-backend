import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";

// FOR VALIDATING REQUESTS USING EXPRESS-VALIDATOR AND RETURNING ERRORS IN UNIFORM FORMAT

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    console.log("Validation Errors:", errors.array());
    return next(
      new ApiError(
        400,
        "Validation failed",
        errors.array()
      )
    );
  }

  next();
};

export default validate;