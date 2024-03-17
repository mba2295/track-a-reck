import { Status } from "@prisma/client";
import { z } from "zod";

export const ticketSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Cannot be more that 255 characters"),
  description: z.string().min(1, "Description is required").max(65535),
});

export const PatchTicketSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Cannot be more that 255 characters")
    .optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "assignedToUserId is required")
    .max(255)
    .nullable()
    .optional(),
  status: z.nativeEnum(Status).optional(),
});
