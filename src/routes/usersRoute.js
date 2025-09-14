import express from "express";
import { responseClient } from "../middleware/responseClient.js";
import { verifyAccessJWT } from "../utils/jwt.js";
import { getSession } from "../models/session/SessionModel.js";
import { getUserByEmail } from "../models/user/UserModel.js";
import { userAuthMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", userAuthMiddleware, async (req, res) => {
  const user = req.userInfo;

  // we override belows to undefined so that it will remove[cause these will tranform to JSON format and then] from the response
  user.password = undefined;
  user.__v = undefined;
  user.refreshJWT = undefined;
  // const { password, __v, refreshJWT, ...user } = req.userInfo;

  return responseClient({
    req,
    res,
    message: "User Profile",
    payload: user,
  });
});

export default router;
