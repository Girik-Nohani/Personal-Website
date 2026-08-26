'use client'

import { useEffect, useRef } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'
import type { ExperienceEntry } from '@/types/content'

interface ExperienceListProps {
  entries: ExperienceEntry[]
  selectedId: string
  onSelect: (id: string) => void
}

const AUTO_SCROLL_MS = 5000

export function ExperienceList({ entries, selectedId, onSelect }: ExperienceListProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const firstCardRef = useRef<HTMLButtonElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (entries.length <= 3) return
    intervalRef.current = setInterval(() => {
      const el = scrollRef.current
      const cardHeight = firstCardRef.current?.offsetHeight ?? 88
      if (!el) return
      const maxScroll = el.scrollHeight - el.clientHeight
      const next = el.scrollTop + cardHeight
      el.scrollTo({ top: next >= maxScroll - 4 ? 0 : next, behavior: 'smooth' })
    }, AUTO_SCROLL_MS)
  }

  useEffect(() => {
    startAutoScroll()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries.length])

  return (
    <div
        ref={scrollRef}
         className="flex max-h-exp-list scrollbar-none flex-col divide-y divide-white/10 overflow-y-auto sm:max-h-exp-list-sm"
    >
      {entries.map((entry, i) => {
        const isSelected = entry._id === selectedId
        return (
          <button
            key={entry._id}
            ref={i === 0 ? firstCardRef : undefined}
            onClick={() => {
              onSelect(entry._id)
              startAutoScroll()
            }}
            className="flex items-center justify-between gap-sm py-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal"
          >
            <div className="flex flex-col gap-xs">
              <p className="font-mono text-detail font-semibold">
                {entry.isCurrent ? (
                  <span className="text-accent-yellow">Today</span>
                ) : (
                  <span className="text-text-tertiary">
                    {entry.startYear} <span className="text-accent-yellow">To</span> {entry.endYear}
                  </span>
                )}
              </p>
              <h4 className="font-display text-title-sm font-semibold uppercase text-accent-teal">
                {entry.company}
              </h4>
              <p className="font-mono text-detail font-normal text-text-quaternary">{entry.role}</p>
            </div>
            {isSelected ? (
              <ChevronDown className="h-5 w-5 shrink-0 text-text-primary" />
            ) : (
              <ChevronRight className="h-5 w-5 shrink-0 text-text-muted" />
            )}
          </button>
        )
      })}
    </div>
  )
}