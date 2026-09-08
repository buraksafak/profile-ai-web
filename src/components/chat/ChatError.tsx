interface ChatErrorProps {
  message: string | null;
}

export function ChatError({ message }: ChatErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <div
      role="alert"
      className="mx-4 mb-2 rounded-xl border border-amber-400/35 bg-amber-50 px-3 py-2 text-sm text-amber-900 sm:mx-6 dark:border-amber-300/25 dark:bg-amber-400/10 dark:text-amber-100"
    >
      {message}
    </div>
  );
}
