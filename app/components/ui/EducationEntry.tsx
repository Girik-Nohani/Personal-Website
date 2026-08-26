import { GraduationCap } from 'lucide-react'
import type { EducationEntry as EducationEntryType } from '@/types/content'

interface EducationEntryProps {
  entry: EducationEntryType
}

export function EducationEntry({ entry }: EducationEntryProps) {
  const iconBox = (
    <div
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-icon-bg"
      aria-hidden={!entry.institutionUrl}
    >
      <GraduationCap className="text-text-secondary" size={28} />
    </div>
  )

  return (
    <div className="flex gap-md">
      {entry.institutionUrl ? (
        <a
          href={entry.institutionUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${entry.institution}'s website`}
          className="shrink-0 transition-opacity hover:opacity-80"
        >
          {iconBox}
        </a>
      ) : (
        iconBox
      )}
      <div className="flex flex-col gap-xs">
        <h4 className="font-display text-title-sm font-semibold uppercase text-accent-teal">
          {entry.degreeTitle}
        </h4>
        <p className="font-mono text-detail text-text-secondary">
          ({entry.institution}) {entry.startYear}
          {entry.endYear && (
            <>
              {' '}<span className="text-accent-yellow">–</span> {entry.endYear}
            </>
          )}
        </p>
        <p className="font-display text-body text-text-quaternary">{entry.description}</p>
      </div>
    </div>
  )
}