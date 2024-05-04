import nodemailer from "nodemailer";
const {
  PORT,
  MAIL_SERVICE_HOST,
  MAIL_SERVICE_PORT,
  MAIL_SERVICE_USER,
  MAIL_SERVICE_PASS,
  MAIL_SERVICE_FROM,
} = process.env;

export const nodemailerService = async (verificationtoken, email) => {
  try {
    const emailTransporter = nodemailer.createTransport({
      host: MAIL_SERVICE_HOST,
      port: +MAIL_SERVICE_PORT,
      auth: {
        user: MAIL_SERVICE_USER,
        pass: MAIL_SERVICE_PASS,
      },
    });

    const emailConfig = {
      from: `Hello from ${MAIL_SERVICE_FROM}`,
      to: email,
      subject: "Email verification",
      text: `Veirify your emai. http://localhost:${PORT}/users/verify/${verificationtoken}`,
      html: `<h1>Veirify your email</h1>
    <a href="http://localhost:${PORT}/users/verify/${verificationtoken}">Verify your email</a>`,
    };

    await emailTransporter.sendMail(emailConfig);
    return true;
  } catch (error) {
    return false;
  }
};
