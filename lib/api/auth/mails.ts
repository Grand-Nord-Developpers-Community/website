import { resend } from "@/lib/resend";


import { generateEmailVerificationCode } from "@/lib/auth/utils";
import LoginCodeEmail from "@/emails/login-code";
import ResetPasswordEmail from "@/emails/password-reset";


 
export const sendEmailVerificationCode = async ({
  email,
  userId,
}: {
  userId: string;
  email: string;
}) => {
  const code = await generateEmailVerificationCode(userId, email);
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: [email],
      subject: "Verify your email address",
      text: `Your email verification code is: ${code}`,
      react: LoginCodeEmail({ validationCode: code }),
    });
  } catch (error) {
    console.log("Failed to send email", error);
    throw new Error("Failed to send email");
  }
};
type SendPasswordResetTokenProps = {
  email: string;
  verificationLink: string;
  firstname: string;
};
export const sendPasswordResetToken = async ({
  email,
  verificationLink,
  firstname,
}: SendPasswordResetTokenProps) => {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: [email],
      subject: "Reset your password",
      text: `Your link is here ${verificationLink}`,
      react: ResetPasswordEmail({
        userFirstname: firstname,
        resetPasswordLink: verificationLink,
      }),
    });
  } catch (error) {
    console.log("Failed to send email", error);
    throw new Error("Failed to send email");
  }
};
