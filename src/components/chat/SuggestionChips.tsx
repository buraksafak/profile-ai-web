import { suggestedQuestions } from '@/data/suggestions';
import { Button } from '@/components/ui/button';

interface SuggestionChipsProps {
  disabled: boolean;
  onSelect: (question: string) => void;
}

export function SuggestionChips({ disabled, onSelect }: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 px-4 pb-3 sm:px-6">
      {suggestedQuestions.map((question) => (
        <Button
          key={question}
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled}
          className="h-auto max-w-full rounded-full border-cyan-500/35 bg-sky-100 px-3 py-1.5 text-left text-xs text-sky-950 whitespace-normal hover:bg-sky-200/80 dark:border-cyan-200/20 dark:bg-white/5 dark:text-cyan-50 dark:hover:bg-cyan-300/10"
          onClick={() => onSelect(question)}
        >
          {question}
        </Button>
      ))}
    </div>
  );
}
