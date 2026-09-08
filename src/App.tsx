import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/hooks/useTheme';
import { ChatScreen } from '@/screens/ChatScreen';

export default function App() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <ChatScreen />
      </TooltipProvider>
    </ThemeProvider>
  );
}
