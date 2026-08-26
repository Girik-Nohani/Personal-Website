// app/components/ui/ExperienceDetail.tsx
import type { ExperienceEntry } from '@/types/content'

interface ExperienceDetailProps {
  entry: ExperienceEntry
}

export function ExperienceDetail({ entry }: ExperienceDetailProps) {
  const eyebrowText = entry.isCurrent
    ? '// Current'
    : `// ${entry.startYear} — ${entry.endYear}`

  return (
    <div className="relative flex-1">
      {/* Corner brackets — top-right and bottom-left only, yellow */}
      <span
        aria-hidden="true"
        className="absolute right-0 top-0 h-md w-md border-r-2 border-t-2 border-accent-yellow"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-md w-md border-b-2 border-l-2 border-accent-yellow"
      />

      <div className="max-h-exp-list scrollbar-none scroll-fade-y overflow-y-auto p-scroll-fade-inset sm:max-h-exp-list-sm">
        <p className="font-mono text-eyebrow font-semibold uppercase tracking-wider text-accent-yellow">
          {eyebrowText}
        </p>

        <h3 className="mt-xs font-display text-title-lg font-semibold uppercase text-accent-teal">
          {entry.company}
        </h3>

        <p className="mt-xs font-mono text-detail font-normal text-text-quaternary">{entry.role}</p>

        {entry.descriptionStyle === 'bullets' ? (
          <ul className="mt-md list-disc space-y-xs pl-md font-display text-body text-text-tertiary">
            {entry.description.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        ) : (
          <div className="mt-md space-y-sm font-display text-body text-text-tertiary">
            {entry.description.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}