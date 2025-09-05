import express from "express";

const router = express.Router();

router.get("/profile", (req, res) => {
  // check if valid

  // check if exist in session table

  // get user by email

  // return the user
  res.json({
    message: "TODO",
  });
});

export default router;
