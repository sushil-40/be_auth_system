import { createNewUser } from "../models/user/UserModel.js";
import { hashPassword } from "../utils/bcrypt.js";

export const insertNewUser = async (req, res, next) => {
  try {
    // to do signup process

    //recieve the user data
    //encrpty the password
    const { password } = req.body;
    req.body.password = hashPassword(password);

    //insert into DB
    const user = await createNewUser(req.body);

    if (user?._id) {
      // create an unique user activation link and send to their email
      res.json({
        status: "success",
        message: "TODO",
      });
    }
    res.json({
      status: "error",
      message: "Unable to create an account, try again later!",
    });
    return;
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message =
        "The email already exists for another user, try different email or login!";
      error.statusCode = 200;
    }

    next(error);
  }
};
