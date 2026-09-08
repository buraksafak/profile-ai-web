import { z } from 'zod';

export const chatMessageSchema = z.object({
  message: z
    .string()
    .trim()
    .min(2, 'message must be at least 2 characters')
    .max(1000, 'message must be at most 1000 characters'),
});

export type ChatMessageInput = z.infer<typeof chatMessageSchema>;
