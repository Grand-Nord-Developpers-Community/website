import { z } from "zod"
export const completeProfileSchema = z.object({
  username:z.string().min(4, "Identifiant doit doit être plus de 2 caractères").max(15, "Identifiant doit doit être moins de 15 caractères").regex(/^[a-zA-Z0-9_]+$/, { message: "L'identifiant ne peut contenir que des lettres, des chiffres et des underscores (_)." }),
  name: z.string().min(4, "Nom doit doit être plus de 2 caractères").max(20, "Nom doit doit être moins de 20 caractères").regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, { message: "Le nom ne peut contenir que des lettres, des espaces, des traits d'union (-) et des apostrophes (')." }),
  bio: z.string().max(70, " votre bio ne doit pas être trop long!").optional(),
  websiteLink: z.string().url().optional().or(z.literal('')),
});
