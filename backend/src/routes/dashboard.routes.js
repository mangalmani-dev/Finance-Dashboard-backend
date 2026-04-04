import express from "express";
import {
  getDashboardSummary,
  getCategorySummary,
  getRecentActivity
} from "../controllers/dashboard.controller.js";

import authenticateUser from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";

const router = express.Router();

// DASHBOARD ROUTES FOR SUMMARY, CATEGORY SUMMARY, AND RECENT ACTIVITY

router.get("/summary",authenticateUser,authorizeRoles("analyst", "admin"),getDashboardSummary);

router.get("/category-summary",authenticateUser,authorizeRoles("analyst", "admin"),getCategorySummary);

router.get("/recent-activity",authenticateUser,authorizeRoles("viewer", "analyst", "admin"),getRecentActivity);

export default router;