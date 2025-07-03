import express from "express";
import { insertNewUser } from "../controllers/authController.js";

const router = express.Router();

// User SingUp
router.post("/register", insertNewUser);

export default router;
