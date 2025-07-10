import { z } from "zod";

export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string({
        required_error: "Le mot de passe actuel est requis.",
      })
      .min(8, "Le mot de passe actuel doit contenir au moins 8 caractères."),
    newPassword: z
      .string({
        required_error: "Le nouveau mot de passe est requis.",
      })
      .min(8, "Le nouveau mot de passe doit contenir au moins 8 caractères."),
    confirmNewPassword: z.string({
      required_error: "Veuillez confirmer le nouveau mot de passe.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmNewPassword"],
  });

export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
