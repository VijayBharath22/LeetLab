import nodemailer from "nodemailer";
import Mailgen from "mailgen";

const sendEmail = async (options) => {
  const mailgen = new Mailgen({
    theme: "default",
    product: {
      name: "Leetlab",
      link: "https://mailgen.js/",
    },
  });

  const textMailgenContent = mailgen.generatePlaintext(options.mailgenContent);
  const htmlMailgenContent = mailgen.generate(options.mailgenContent);

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  await transport.sendMail({
    from: process.env.SMTP_EMAIL,
    to: options.email,
    subject: options.subject,
    html: htmlMailgenContent,
    text: textMailgenContent,
  });
};

const createVerificationMailgenContent = (name, registrationURL) => {
  return {
    body: {
      name: name,
      intro: `Welcome ${name} to Leetlab! We're very excited to have you on board.`,
      action: {
        instructions: "To get started with your account, please click here:",
        button: {
          color: "#22BC66",
          text: "Verify Email",
          link: registrationURL,
        },
      },
      outro:
        "any help needed? Just reply to this email, we'd love to help. Thanks!",
    },
  };
};

const createResetPasswordMailgenContent = (name, resetURL) => {
  return {
    body: {
      name: name,
      intro: `Hello ${name}, you have requested to reset your password for your Leetlab account.`,
      action: {
        instructions: "To reset your password, please click here:",
        button: {
          color: "#FF0000",
          text: "Reset Password",
          link: resetURL,
        },
      },
      outro:
        "If you did not request a password reset, please ignore this email or reply to let us know. Thanks!",
    },
  };
};

export { sendEmail, createVerificationMailgenContent, createResetPasswordMailgenContent };
