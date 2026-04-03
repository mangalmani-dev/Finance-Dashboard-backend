import express from "express";
import {
  createRecord,
  getAllRecords,
  getRecordById,
  updateRecord,
  deleteRecord
} from "../controllers/record.controller.js";

import authenticateUser from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";
import { createRecordValidator } from "../validators/record.validator.js";
import validate from "../middlewares/validation.middleware.js";

const router = express.Router();

router.post("/create",authenticateUser,  authorizeRoles("admin"),createRecordValidator,  validate,createRecord);

router.get("/all",authenticateUser,authorizeRoles("viewer", "analyst", "admin"),getAllRecords);

router.get("/:id",authenticateUser,authorizeRoles("viewer", "analyst", "admin"),getRecordById);

router.put("/:id",authenticateUser,authorizeRoles("admin"),createRecordValidator,validate,updateRecord);

router.delete("/:id",authenticateUser,authorizeRoles("admin"),deleteRecord);

export default router;