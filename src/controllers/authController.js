import { createNewUser } from "../models/user/UserModel.js";
import { hashPassword } from "../utils/bcrypt.js";

export const insertNewUser = async (req, res, error) => {
  try {
    // to do signup process

    //recieve the user data
    //encrpty the password
    const { password } = req.body;
    req.body.password = hashPassword(password);

    //insert into DB
    const user = await createNewUser(req.body);
    // create an unique user activation link and send to their email

    res.json({
      status: "success",
      message: "TODO",
    });
  } catch (error) {
    next(error);
  }
};
