import { SubSectionHeading } from '@/components/ui/SubSectionHeading'
import { EducationEntry } from '@/components/ui/EducationEntry'
import type { EducationEntry as EducationEntryType, SubSectionHeadingContent } from '@/types/content'

interface EducationProps {
  entries: EducationEntryType[]
  heading: SubSectionHeadingContent
}

export function Education({ entries, heading }: EducationProps) {
  return (
    <div className="bg-surface lg:py-xl">
      <div className="mx-auto max-w-6xl px-6 py-xl">
        <div className="flex flex-col gap-xl md:gap-lg lg:flex-row">
          <div className="lg:w-2/5">
            <SubSectionHeading align="right" {...heading} />
          </div>
          <div className="lg:w-3/5">
            {entries.length ? (
              <div className="space-y-lg">
                {entries
                  .slice()
                  .sort((a, b) => a.order - b.order)
                  .map((entry) => (
                    <EducationEntry key={entry._id} entry={entry} />
                  ))}
              </div>
            ) : (
              <p className="mt-lg text-center text-text-muted">More to come soon.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}