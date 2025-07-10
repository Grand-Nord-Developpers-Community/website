import { z } from "zod";
export const updateUserSchema = z
  .object({
    username: z
      .string()
      .min(4, "Identifiant doit doit être plus de 2 caractères")
      .max(15, "Identifiant doit doit être moins de 15 caractères")
      .regex(/^[a-zA-Z0-9_]+$/, {
        message:
          "L'identifiant ne peut contenir que des lettres, des chiffres et des underscores (_).",
      }),
    name: z
      .string()
      .min(4, "Nom doit doit être plus de 2 caractères")
      .max(20, "Nom doit doit être moins de 20 caractères")
      .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, {
        message:
          "Le nom ne peut contenir que des lettres, des espaces, des traits d'union (-) et des apostrophes (').",
      }),
    bio: z
      .string()
      .max(70, " votre bio ne doit pas être trop long!")
      .optional(),
    email: z.string().email().optional(),
    currentPassword: z.string().optional(),
    newPassword: z.string().min(8).optional(),
    confirmNewPassword: z.string().optional(),
    image: z.string().url().optional().nullable().or(z.literal("")),
    location: z.string().max(100).optional(),
    phoneNumber: z.string().max(20).optional(),
    githubLink: z.string().url().or(z.literal("")),
    twitterLink: z.string().url().or(z.literal("")),
    instagramLink: z.string().url().or(z.literal("")),
    websiteLink: z.string().url().or(z.literal("")),
    skills: z
      .array(
        z.object({
          id: z.string(),
          text: z.string(),
        })
      )
      .optional(),
  })
  .refine(
    (data) => {
      if (data.newPassword) {
        return data.newPassword === data.confirmNewPassword;
      }
      return true;
    },
    {
      message: "New passwords do not match",
      path: ["confirmNewPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword) {
        return !!data.currentPassword;
      }
      return true;
    },
    {
      message: "Current password is required to set a new password",
      path: ["currentPassword"],
    }
  );
