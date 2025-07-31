import { responseClient } from "../middleware/responseClient.js";
import {
  createNewSession,
  deleteSession,
} from "../models/session/SessionModel.js";
import { createNewUser, updateUser } from "../models/user/UserModel.js";
import {
  userActivatedNotificationEmail,
  userActivationUrlEmail,
} from "../services/email/emailService.js";
import { hashPassword } from "../utils/bcrypt.js";
import { v4 as uuidv4 } from "uuid";

export const insertNewUser = async (req, res, next) => {
  try {
    // to do signup process

    //recieve the user data
    //encrpty the password
    console.log(req);
    const { password } = req.body;
    console.log("*********", req.body);
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
        const url = `${process.env.ROOT_URL}/activate-user?sessionId=${session._id}&t=${session.token}`;

        //send this url to their email

        const emailId = await userActivationUrlEmail({
          email: user.email,
          url,
          name: user.fName,
        });
        if (emailId) {
          const message =
            "We have sent you an email with activation link. Please check your email and follow the instruction to activate your created Account.";
          return responseClient({ req, res, message });
        }
      }
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

export const activateUser = async (req, res, next) => {
  try {
    const { sessionId, t } = req.body;
    console.log(sessionId, t);

    const session = await deleteSession({
      _id: sessionId,
      token: t,
    });
    if (session?._id) {
      // update user to active
      const user = await updateUser(
        { email: session.association },
        { status: "active" }
      );
      // if it is updated
      if (user?._id) {
        //respond to front-end
        userActivatedNotificationEmail({ email: user.email, name: user.fName });
        //send email notification
        const message = "Your account has been activated you may log in now!";
      }
    }
    const message = "Invalid link or token expired !";

    const statusCode = 400;
    responseClient({ req, res, message, statusCode });
  } catch (error) {
    next(error);
  }
};
