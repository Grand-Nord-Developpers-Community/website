import { z } from "zod";

export const forumPublishSchema = z.object({
  title: z
    .string()
    .min(45, "Le titre doit contenir au moins 45 caractères.")
    .max(60, "Le titre est trop long, gardez-le sous 45 caractères."),
  content: z
    .string()
    .min(200, "Le contenu du forum doit contenir au moins 200 caractères.")
});
