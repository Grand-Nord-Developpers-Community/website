import { z } from "zod"
export const  completeProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  bio: z.string().optional(),
  websiteLink: z.string().url().optional().or(z.literal('')),
});