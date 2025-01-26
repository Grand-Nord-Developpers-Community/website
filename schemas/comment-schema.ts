import { z } from "zod";

export const commentSchema = z.object({
  postId: z.string(),
  parentId: z.string().nullable(),
  content: z
    .string()
    .min(3, "Le commentaire doit contenir au moins 3 caractères."),
});
