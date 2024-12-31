import { z } from "zod";

export const blogPublishSchema = z.object({
  title: z
    .string()
    .min(30, "Le titre doit contenir au moins 50 caractères pour le SEO.")
    .max(60, "Le titre est trop long, gardez-le sous 60 caractères."),
  description: z
    .string()
    .min(80, "La description doit contenir au moins 80 caractères.")
    .max(120, "La description est trop longue, limitez-la à 120 caractères."),
  preview: z
    .string()
    .url("veuillez inserez un aperçu du blog"),
  previewHash: z
    .string().min(4),
  content: z
    .string()
    .min(300, "Le contenu du blog doit contenir au moins 300 caractères.")
});
