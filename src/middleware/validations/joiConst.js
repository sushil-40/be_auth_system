// fName: Joi.string().min(5).required(),
// lName: Joi.string().min(5).required(),
// email: Joi.string().email({ minDomainSegments: 2 }).required(),
// phone: Joi.number(),
// password: Joi.string().required(),
import Joi from "joi";
export const FNAME = Joi.string().min(5);
export const FNAME_REQ = FNAME.required();

export const LNAME = Joi.string().min(5).required();
export const LNAME_REQ = LNAME.required();

export const EMAIL = Joi.string().email({ minDomainSegments: 2 });
export const EMAIL_REQ = EMAIL.required();

export const PASSWORD = Joi.string().min(5).required();
export const PASSWORD_REQ = PASSWORD.required();

export const PHONE = Joi.number();
export const PHONE_REQ = PHONE.required();

export const SESSION = Joi.string().min(10);
export const SESSION_REQ = SESSION.required();

export const TOKEN = Joi.string().min(10);
export const TOKEN_REQ = TOKEN.required();
