import { z } from "zod";

export const blogPublishSchema = z.object({
  title: z
    .string()
    .min(35, "Le titre doit contenir au moins 50 caractères pour le SEO.")
    .max(50, "Le titre est trop long, gardez-le sous 60 caractères."),
  description: z
    .string()
    .min(90, "La description doit contenir au moins 120 caractères.")
    .max(120, "La description est trop longue, limitez-la à 160 caractères."),
  preview: z
    .string()
    .url("L'URL de l'aperçu doit être valide."),
  previewHash: z
    .string()
    .regex(/^[a-f0-9]{64}$/, "Hash invalide. Doit être un SHA256 valide."),
  content: z
    .string()
    .min(300, "Le contenu du blog doit contenir au moins 300 caractères.")
    .max(2000, "Pour le SEO, le contenu ne doit pas dépasser 2000 caractères."),
});
