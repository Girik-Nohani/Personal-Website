'use client'

import { useState } from 'react'
import { SubSectionHeading } from '@/components/ui/SubSectionHeading'
import { DoubleDivider } from '@/components/ui/DoubleDivider'
import { ExperienceDetail } from '@/components/ui/ExperienceDetail'
import { ExperienceList } from '@/components/ui/ExperienceList'
import type { ExperienceEntry, SubSectionHeadingContent } from '@/types/content'

interface ExperienceProps {
  entries: ExperienceEntry[]
  heading: SubSectionHeadingContent
}

export function Experience({ entries, heading }: ExperienceProps) {
  const sorted = [...entries].sort((a, b) => a.order - b.order)
  const defaultEntry = sorted.find((e) => e.isCurrent) ?? sorted[0]
  const [selectedId, setSelectedId] = useState(defaultEntry?._id ?? '')

  const headingBlock = <SubSectionHeading {...heading} align="left" />

  if (!sorted.length) {
    return (
      <div className="w-full bg-background py-xl">
        <div className="mx-auto max-w-6xl px-6">
          {headingBlock}
          <p className="mt-lg text-text-muted">More experience coming soon.</p>
        </div>
      </div>
    )
  }

  const selected = sorted.find((e) => e._id === selectedId) ?? sorted[0]

  return (
    <div className="w-full bg-background lg:py-xl">
      <div className="mx-auto max-w-6xl px-6 py-xl">
        {headingBlock}

        <DoubleDivider orientation="horizontal" />

        <div className="mt-xl flex flex-col gap-lg lg:flex-row lg:items-stretch">
          <ExperienceDetail entry={selected} />

          <DoubleDivider orientation="vertical" />

          <div className="flex-1">
            <ExperienceList entries={sorted} selectedId={selected._id} onSelect={setSelectedId} />
          </div>
        </div>
      </div>
    </div>
  )
}