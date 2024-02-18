import { z } from "zod";

export const ticketSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Cannot be more that 255 characters"),
  description: z.string().min(1, "Description is required"),
});
