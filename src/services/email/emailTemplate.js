export const userActivationUrlEmailTemplate = ({ email, name, url }) => {
  return {
    from: `"Local Library" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Action Required - Activate your new account!",
    text: `Hello ${name} follow the link to activate your account!`, // plain‑text body
    html: `
    <p>Hello! ${name}</p>
<br/>
<br/>
<p>Your account has been created. Click the button below to activate your account.${URL}</p>
<br/>
<br/>
<a href=${url}><button style="background: green; color: white; padding: 2rem"> Activate Now</button></a>

<br/>
<br/>
    `, // HTML body
  };
};
