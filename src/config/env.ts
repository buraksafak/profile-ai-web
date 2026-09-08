import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z
    .string()
    .trim()
    .min(1, 'VITE_API_URL is required')
    .refine((value) => {
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    }, 'VITE_API_URL must be a valid URL'),
});

const parsed = envSchema.safeParse({
  VITE_API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

if (!parsed.success) {
  console.error(
    'Invalid environment configuration:',
    parsed.error.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    })),
  );
  throw new Error('Invalid environment configuration');
}

export const env = parsed.data;
export type Env = z.infer<typeof envSchema>;
