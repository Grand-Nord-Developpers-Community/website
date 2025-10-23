import { z } from "zod";

export const blogPublishSchema = z.object({
  title: z
    .string()
    .min(10, "Le titre doit contenir au moins 10 caractères pour le SEO.")
    .max(30, "Le titre est trop long, gardez-le sous 30 caractères."),
  description: z
    .string()
    .min(20, "La description doit contenir au moins 20 caractères.")
    .max(80, "La description est trop longue, limitez-la à 80 caractères."),
  preview: z.string().url("veuillez inserez un aperçu du blog"),
  previewHash: z.string().min(4),
  content: z
    .string()
    .min(300, "Le contenu du blog doit contenir au moins 300 caractères."),
  tags: z.string(),
});
