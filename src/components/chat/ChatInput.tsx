import { useState, type FormEvent, type KeyboardEvent } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const MAX_LENGTH = 1000;

interface ChatInputProps {
  disabled: boolean;
  onSend: (message: string) => void;
}

export function ChatInput({ disabled, onSend }: ChatInputProps) {
  const [value, setValue] = useState('');
  const trimmed = value.trim();
  const canSend = !disabled && trimmed.length >= 2 && trimmed.length <= MAX_LENGTH;

  const submit = (): void => {
    if (!canSend) {
      return;
    }

    onSend(trimmed);
    setValue('');
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    submit();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  };

  return (
    <form onSubmit={onSubmit} className="border-t border-cyan-500/20 px-4 py-3 sm:px-6 sm:py-4 dark:border-border">
      <label htmlFor="chat-message" className="sr-only">
        Mesajın
      </label>
      <div className="flex items-end gap-2 rounded-2xl border border-cyan-500/30 bg-sky-100/70 p-2 dark:border-border dark:bg-slate-950/60">
        <Textarea
          id="chat-message"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={onKeyDown}
          disabled={disabled}
          maxLength={MAX_LENGTH}
          rows={1}
          placeholder="Burak hakkında bir şey sor..."
          className="max-h-36 min-h-11 flex-1 resize-none border-0 bg-transparent px-2 py-2 shadow-none focus-visible:ring-0 dark:bg-transparent"
        />
        <Button
          type="submit"
          size="icon"
          disabled={!canSend}
          aria-label="Gönder"
          className={cn(
            'size-10 rounded-xl bg-cyan-400 text-slate-950 hover:bg-cyan-300',
            !canSend ? 'opacity-40' : '',
          )}
        >
          <ArrowUp className="size-4" />
        </Button>
      </div>
      <p className="mt-1.5 text-right text-[11px] text-muted-foreground">
        {value.trim().length}/{MAX_LENGTH}
      </p>
    </form>
  );
}
