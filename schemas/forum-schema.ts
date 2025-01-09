import { z } from "zod";

export const forumPublishSchema = z.object({
  title: z
    .string()
    .min(3, "Le titre doit contenir au moins 3caractères.")
    .max(45, "Le titre est trop long, gardez-le sous 45 caractères."),
  content: z
    .string()
    .min(10, "Le contenu du forum doit contenir au moins 10 caractères.")
});
