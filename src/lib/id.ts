export function createId(): string {
  try {
    if (typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
  } catch {
    // HTTP on a public IP is not a secure context.
  }

  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
