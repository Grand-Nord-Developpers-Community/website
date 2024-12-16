import { z } from "zod";

export const blogPublishSchema = z.object({
  title: z
    .string()
    .min(10, "Le titre doit contenir au moins 50 caractères pour le SEO.")
    .max(35, "Le titre est trop long, gardez-le sous 60 caractères."),
  description: z
    .string()
    .min(25, "La description doit contenir au moins 120 caractères.")
    .max(35, "La description est trop longue, limitez-la à 160 caractères."),
  preview: z
    .string()
    .url("veuillez inserez un aperçu du blog"),
  previewHash: z
    .string().min(4),
  content: z
    .string()
    .min(10, "Le contenu du blog doit contenir au moins 300 caractères.")
    .max(2000, "Pour le SEO, le contenu ne doit pas dépasser 2000 caractères."),
});
