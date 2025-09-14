import { getSession } from "../models/session/SessionModel.js";
import { getUserByEmail } from "../models/user/UserModel.js";
import { verifyAccessJWT } from "../utils/jwt.js";
import { responseClient } from "./responseClient.js";

export const userAuthMiddleware = async (req, res, next) => {
  // get accessJWT
  const { authorization } = req.headers;
  // console.log(authorization);

  let message = "Unauthorized";

  if (authorization) {
    const token = authorization.split(" ")[1];
    console.log(token);

    // check if valid
    const decoded = verifyAccessJWT(token);
    if (decoded.email) {
      // check if exist in session table
      const tokenSession = await getSession({ token });
      if (tokenSession?._id) {
        // get user by email
        const user = await getUserByEmail(decoded.email);
        if (user?._id && user.status === "active") {
          // return the user

          //we create userInfo in req object
          req.userInfo = user;
          return next();
        }
      }
    }
    message = decoded === "jwt expired" ? decoded : "Unauthorized";
  }

  responseClient({ req, res, message, statusCode: 401 });
};
