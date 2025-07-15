import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { createUserTemplateMail } from "./utils/templates";
dotenv.config()

const tranporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

const main = async () => {
  const connection = await tranporter.verify();
  if (connection) {
    const info = await tranporter.sendMail({
      from: `Allan Reynoso <admin@microsoft.com>`,
      to: "reynos09913@gmail.com",
      subject: "Esto es una prueba para la clase",
      html: createUserTemplateMail({ }),
    });

    console.log({ info });
  } else {
    console.error("Error in verify");
  }
};

main();
