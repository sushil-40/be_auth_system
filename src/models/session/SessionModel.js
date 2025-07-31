import SessionSchema from "./SessionSchema.js";

// insert new session
export const createNewSession = (sessionObj) => {
  return SessionSchema(sessionObj).save();
};

export const deleteSession = (filter) => {
  return SessionSchema.findOneAndDelete(filter);
};
