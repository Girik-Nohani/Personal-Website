// app/components/sections/Writeups.tsx
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SubSectionHeading } from '@/components/ui/SubSectionHeading'
import { WriteupListItem } from '@/app/components/ui/WriteupListItem'
import type { Writeup, SubSectionHeadingContent } from '@/types/content'

interface WriteupsProps {
  writeups: Writeup[]
  heading: SubSectionHeadingContent
}

export function Writeups({ writeups, heading }: WriteupsProps) {
  const sorted = [...writeups].sort((a, b) => a.order - b.order)

  return (
    <div className="w-full bg-background lg:py-xl">
      <div className="mx-auto max-w-6xl px-6 py-xl">
        <SectionHeading number="03" title="Writeups" />
        <div className="mt-xl">
          <SubSectionHeading {...heading} align="center" />

          {sorted.length === 0 ? (
            <p className="mt-lg text-center font-display text-text-muted">
              More writeups coming soon.
            </p>
          ) : (
            <div className="mx-auto mt-xl max-h-writeups-list max-w-3xl scrollbar-none scroll-fade-y divide-y divide-white/10 overflow-y-auto py-scroll-fade-inset sm:max-h-writeups-list-sm">
              {sorted.map((writeup, i) => (
                <WriteupListItem key={writeup._id} writeup={writeup} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}