import express from "express";
import authenticateUser from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";
import validate from "../middlewares/validation.middleware.js";
import { updateUserRoleValidator } from "../validators/updateUserRole.validator.js";
import { updateUserRole } from "../controllers/admin.role.js";

const router = express.Router();

// ADMIN ROUTES FOR MANAGING USER ROLES

router.patch(
  "/users/:id/role",
  authenticateUser,
  authorizeRoles("admin"),
  updateUserRoleValidator,
  validate,
  updateUserRole
);

export default router;