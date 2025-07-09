import nodemailer from "nodemailer";

export const emailTransporter = () => {
  // Create a SMTP transporter object
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: +process.env.SMTP_PORT,

    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  return transporter;
};
