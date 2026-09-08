"use server";

import { z } from "zod";
import { transporter } from "@/lib/connection";
import { renderEmail } from "@/emails/mailer";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().min(6, "Numéro de téléphone invalide"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export async function sendContactEmail(formData: ContactFormData): Promise<{
  success: boolean;
  error?: string;
}> {
  // Validate input
  const parsed = contactSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Données invalides",
    };
  }

  const { name, email, phone, message } = parsed.data;

  try {
    const html = await renderEmail({
      type: "contact",
      props: { name, email, phone, message },
    });

    await transporter.sendMail({
      from: `"GNDC Contact" <${process.env.SMTP_SERVER_USERNAME}>`,
      to: process.env.CONTACT_EMAIL ?? "gndc@no-reply.com",
      replyTo: email,
      subject: `Nouveau message de ${name}`,
      html,
    });

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de l'envoi du message de contact :", error);
    return {
      success: false,
      error: "Une erreur s'est produite. Veuillez réessayer plus tard.",
    };
  }
}