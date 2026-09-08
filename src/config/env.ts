import { z } from 'zod';

const envSchema = z.object({
  VITE_API_URL: z
    .string()
    .trim()
    .refine((value) => {
      if (value === '') {
        return true;
      }

      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    }, 'VITE_API_URL must be a valid URL or empty for same-origin'),
});

function resolveApiUrl(value: string | undefined): string {
  const trimmed = value?.trim() ?? '';

  if (trimmed !== '') {
    return trimmed.replace(/\/+$/, '');
  }

  return import.meta.env.DEV ? 'http://localhost:3000' : '';
}

const parsed = envSchema.safeParse({
  VITE_API_URL: resolveApiUrl(import.meta.env.VITE_API_URL),
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
