import { userActivationUrlEmailTemplate } from "./emailTemplate.js";
import { emailTransporter } from "./transport.js";

export const userActivationUrlEmail = async (obj) => {
  // get the transporter
  const transport = emailTransporter();
  // get the template

  const info = await transport.sendMail(userActivationUrlEmailTemplate(obj));
  //   console.log(info.messageId);
  return info.messageId;
};
