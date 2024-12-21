import { z } from "zod"
export const completeProfileSchema = z.object({
  name: z.string().min(4, "Nom doit doit être plus de 2 caractères").max(20, "Nom doit doit être moins de 20 caractère"),
  bio: z.string().max(70, " votre bio ne doit pas être trop long!").optional(),
  websiteLink: z.string().url().optional().or(z.literal('')),
});
