import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SparklesText } from '@/components/ui/sparkles-text';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { profile } from '@/data/profile';
import { absoluteUrl } from '@/data/site';
import type { HealthIndicator } from '@/hooks/useHealthStatus';
import { cn } from '@/lib/utils';

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.486 2 12.021c0 4.425 2.865 8.18 6.839 9.504.5.093.682-.217.682-.483 0-.237-.009-.866-.013-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.621.069-.609.069-.609 1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.952 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.56 9.56 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.696-4.566 4.944.359.31.678.922.678 1.858 0 1.34-.012 2.419-.012 2.748 0 .268.18.58.688.481A10.02 10.02 0 0 0 22 12.021C22 6.486 17.523 2 12 2Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm9.75 1.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
    </svg>
  );
}

const socialIcons = {
  LinkedIn: LinkedInIcon,
  GitHub: GitHubIcon,
  Instagram: InstagramIcon,
} as const;

interface ChatHeaderProps {
  health: HealthIndicator;
  reducedMotion: boolean;
}

export function ChatHeader({ health, reducedMotion }: ChatHeaderProps) {
  const healthLabel =
    health === 'ok' ? 'Çevrimiçi' : health === 'degraded' ? 'Sınırlı' : 'Kontrol ediliyor';

  return (
    <header
      itemScope
      itemType="https://schema.org/Person"
      className="flex items-center gap-3 border-b border-cyan-500/20 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4 dark:border-border"
    >
      <meta itemProp="url" content={absoluteUrl('/')} />
      <Avatar size="lg" className="size-12 ring-2 ring-cyan-500/25 sm:size-14 dark:ring-cyan-300/30">
        <AvatarImage src={profile.photoSrc} alt={profile.name} itemProp="image" />
        <AvatarFallback className="bg-cyan-100 text-sm font-semibold text-cyan-800 dark:bg-cyan-950 dark:text-cyan-100">
          {profile.initials}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h1
            itemProp="name"
            className="text-base font-semibold tracking-tight text-foreground sm:text-lg"
          >
            {reducedMotion ? (
              profile.name
            ) : (
              <SparklesText
                className="text-base font-semibold tracking-tight text-foreground sm:text-lg"
                colors={{ first: '#22d3ee', second: '#0891b2' }}
                sparklesCount={4}
              >
                {profile.name}
              </SparklesText>
            )}
          </h1>
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px]',
              health === 'ok'
                ? 'border-cyan-500/30 bg-cyan-500/10 text-cyan-800 dark:border-cyan-300/30 dark:bg-cyan-400/10 dark:text-cyan-100/80'
                : 'border-amber-400/40 bg-amber-400/10 text-amber-800 dark:border-amber-300/30 dark:bg-amber-400/10 dark:text-amber-100/90',
            )}
          >
            <span
              className={cn(
                'size-1.5 rounded-full',
                health === 'ok' ? 'bg-cyan-500 dark:bg-cyan-300' : 'bg-amber-500 dark:bg-amber-300',
                health === 'ok' ? 'shadow-[0_0_8px_#22d3ee]' : '',
              )}
            />
            {healthLabel}
          </span>
        </div>
        <p className="truncate text-xs text-muted-foreground sm:text-sm">
          <span itemProp="jobTitle">{profile.title}</span>
          {' · '}
          <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <span itemProp="addressLocality">{profile.location}</span>
          </span>
        </p>
      </div>

      <div className="flex items-center gap-0.5">
        <ThemeToggle />
        <nav aria-label="Sosyal bağlantılar" className="flex items-center gap-0.5">
          {profile.socials.map((social) => {
            const Icon = socialIcons[social.label];
            return (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="me noopener noreferrer"
                itemProp="sameAs"
                className="rounded-full p-2 text-sky-800/70 transition hover:bg-sky-200/60 hover:text-sky-950 focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:outline-none dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-cyan-200"
                aria-label={social.label}
              >
                <Icon className="size-4" />
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
