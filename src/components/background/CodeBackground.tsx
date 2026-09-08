import { Particles } from '@/components/ui/particles';
import { RetroGrid } from '@/components/ui/retro-grid';
import { profile } from '@/data/profile';
import { useImageAvailable } from '@/hooks/useImageAvailable';
import { useIsMobile, usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

const CODE_SNIPPETS = [
  'POST /api/chat',
  'class ProfileAssistant {}',
  'flutter: Cubit / Bloc',
  'await generateResponse()',
  '.NET Core · REST',
  'const reply = await ai.chat()',
];

export function CodeBackground() {
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  const hasPhoto = useImageAvailable(profile.photoSrc);
  const particleCount = reducedMotion ? 0 : isMobile ? 18 : 55;
  const isDark = theme === 'dark';

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[#d5e3ee] dark:bg-[#020617]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,116,144,0.28),_transparent_44%),radial-gradient(circle_at_80%_18%,_rgba(37,99,235,0.16),_transparent_30%)] dark:bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_42%),radial-gradient(circle_at_80%_20%,_rgba(56,189,248,0.12),_transparent_28%)]" />

      {hasPhoto ? (
        <img
          src={profile.photoSrc}
          alt=""
          className="absolute top-[-8%] right-[-6%] h-[78%] w-auto max-w-none object-cover opacity-[0.1] grayscale mix-blend-multiply mask-image-fade dark:opacity-[0.14] dark:mix-blend-screen"
        />
      ) : null}

      <RetroGrid
        className="opacity-80"
        angle={65}
        cellSize={isMobile ? 48 : 60}
        opacity={isDark ? 0.28 : 0.34}
        darkLineColor="rgba(34,211,238,0.55)"
        lightLineColor="rgba(2,132,199,0.5)"
      />

      {particleCount > 0 ? (
        <Particles
          key={theme}
          className="absolute inset-0"
          quantity={particleCount}
          color={isDark ? '#67e8f9' : '#0284c7'}
          size={0.45}
          ease={70}
          staticity={40}
        />
      ) : null}

      <div className="absolute inset-0 hidden font-mono text-[11px] leading-6 text-sky-800/35 sm:block dark:text-cyan-200/20">
        {CODE_SNIPPETS.map((snippet, index) => (
          <span
            key={snippet}
            className={cn(
              'absolute whitespace-nowrap',
              reducedMotion ? '' : 'animate-code-drift',
            )}
            style={{
              top: `${12 + index * 14}%`,
              left: `${6 + (index % 3) * 22}%`,
              animationDelay: `${index * 1.4}s`,
            }}
          >
            {snippet}
          </span>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#d5e3ee]/40 via-transparent to-[#c9d9e8]/90 dark:from-slate-950/20 dark:to-slate-950/80" />
    </div>
  );
}
