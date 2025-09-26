import express from "express";
import {
  activateUser,
  insertNewUser,
  loginUser,
  getProfile,
} from "../controllers/authController.js";
import {
  loginDataValidation,
  newUserDataValidation,
  userActivationDataValidation,
} from "../middleware/validations/authDataValidation.js";
import { userAuthMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

// User SingUp
router.post("/register", newUserDataValidation, insertNewUser);
router.post("/activate-user", userActivationDataValidation, activateUser);
router.post("/login", loginDataValidation, loginUser);

// ✅ User Profile (private route)
router.get("/profile", userAuthMiddleware, getProfile);
export default router;
