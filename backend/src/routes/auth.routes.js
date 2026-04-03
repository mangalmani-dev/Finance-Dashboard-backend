import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/auth.controllers.js";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import validate from "../middlewares/validation.middleware.js";

const router = express.Router();

router.post("/register",registerValidator,validate,registerUser);

router.post("/login",loginValidator,validate,loginUser);

router.post("/logout",logoutUser)

export default router;