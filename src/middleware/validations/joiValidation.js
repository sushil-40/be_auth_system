import Joi from "joi";
import { responseClient } from "../responseClient.js";
export const validateData = ({ req, res, next, obj }) => {
  //create schema or rules
  const schema = Joi.object(obj);

  // pass your data, req.body, to the schema
  //   const value = schema.validate(req.body);
  const { error } = schema.validate(req.body);

  //if has error
  if (error) {
    return responseClient({
      req,
      res,
      message: error.message,
      statusCode: 400,
    });
  }
  //if pass go next() or response error from here

  next();
};
