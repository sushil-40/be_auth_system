import jwt from "jsonwebtoken";
import { createNewSession } from "../models/session/SessionModel.js";
import { updateUser } from "../models/user/UserModel.js";

// ACCESSJWT_SECRET=FSADFJF08S0FSFDN&DF%
// REFRESHJWT_SECRET=FSALFJ%&KSF*{&DF%
//generate accessJWT
export const createAccessJWT = async (email) => {
  //create
  const token = jwt.sign({ email }, process.env.ACCESSJWT_SECRET, {
    expiresIn: "15m",
  });
  //store

  const obj = {
    token,
    association: email,
    expire: new Date(Date.now() + 15 * 60 * 1000), //15m
  };
  const newSessions = await createNewSession(obj);
  return newSessions?._id ? token : null;
};
//decode accessJWT
export const verifyAccessJWT = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.ACCESSJWT_SECRET);
    return decoded;
  } catch (error) {
    return error.message;
  }
};

//generate refreshJWT
export const createRefreshJWT = async (email) => {
  //create
  const refreshJWT = jwt.sign({ email }, process.env.REFRESHJWT_SECRET, {
    expiresIn: "30d",
  });
  //store
  const user = await updateUser({ email }, { refreshJWT });
  return user?._id ? refreshJWT : null;
};

//deconde refreshJWT

export const getJwts = async (email) => {
  return {
    accessJWT: await createAccessJWT(email),
    refreshJWT: await createRefreshJWT(email),
  };
};
