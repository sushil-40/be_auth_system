import { responseClient } from "../middleware/responseClient.js";
import { createNewSession } from "../models/session/SessionModel.js";
import { createNewUser } from "../models/user/UserModel.js";
import { hashPassword } from "../utils/bcrypt.js";
import { v4 as uuidv4 } from "uuid";

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

      const newSessionObj = {
        token: uuidv4(),
        association: user.email,
      };
      const session = await createNewSession(newSessionObj);

      if (session?._id) {
        const url =
          "http//:localhost:5371?sessionId=" +
          session._id +
          "&t=" +
          session.token;

        //send this url to their email
        console.log(url);
      }
      const message =
        "We have sent you an email with activation link. Please check your email and follow the instruction to activate your created Account.";
      return responseClient({ req, res, message });
    }
    throw new error("Unable to create an account, try again later!");
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message =
        "The email already exists for another user, try different email or login!";
      error.statusCode = 400;
    }

    next(error);
  }
};
