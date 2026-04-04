import { Router } from "express";
import ApiResponse from "../utils/ApiResponse.js";

const router = Router();

// HEALTH CHECK ROUTE TO VERIFY SERVER STATUS

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