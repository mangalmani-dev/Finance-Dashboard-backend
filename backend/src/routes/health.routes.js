import { Router } from "express";
import ApiResponse from "../utils/ApiResponse.js";

const router = Router();

router.get("/", (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      "Welcome to Finance Dashboard Backend API"
    )
  );
});

router.get("/health", (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      "Server is healthy",
      {
        status: "Running"
      }
    )
  );
});

export default router;