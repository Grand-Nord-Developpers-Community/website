import { Resend } from "resend";
import * as dotenv from "dotenv";

dotenv.config({
  path: ".env",
});
console.log(process.env.RESEND_API_KEY)
export const resend = new Resend(process.env.RESEND_API_KEY);