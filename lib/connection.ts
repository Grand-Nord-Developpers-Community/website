import IORedis from "ioredis";
import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config({
  path: ".env",
});
const {
  SMTP_SERVER_HOST,
  SMTP_SERVER_USERNAME,
  SMTP_SERVER_PASSWORD,
  SMTP_PORT = "465",
  SMTP_SECURE = "true",
  REDIS_URL,
} = process.env;

export const connection = new IORedis(REDIS_URL!, {
  maxRetriesPerRequest: null,
});
console.log(REDIS_URL);
export const transporter = nodemailer.createTransport({
  host: SMTP_SERVER_HOST,
  port: Number(SMTP_PORT),
  secure: SMTP_SECURE === "true",
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
});
