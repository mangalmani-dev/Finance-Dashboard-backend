import express from "express";
import {
  createRecord,
  getAllRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
  createMultipleRecords
} from "../controllers/record.controller.js";

import authenticateUser from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";
import { createRecordValidator, updateRecordValidator } from "../validators/record.validator.js";
import validate from "../middlewares/validation.middleware.js";

const router = express.Router();

// admin routes only

router.post("/create",authenticateUser,  authorizeRoles("admin"),createRecordValidator,  validate,createRecord);

router.post("/create-multiple", authenticateUser,authorizeRoles("admin"),createRecordValidator, validate, createMultipleRecords);

router.put("/:id",authenticateUser,authorizeRoles("admin"),updateRecordValidator,validate,updateRecord);

router.delete("/delete/:id",authenticateUser,authorizeRoles("admin"),deleteRecord);



// viewer and analyst routes
router.get("/all",authenticateUser,authorizeRoles("viewer", "analyst", "admin"),getAllRecords);

router.get("/:id",authenticateUser,authorizeRoles("viewer", "analyst", "admin"),getRecordById);

export default router;