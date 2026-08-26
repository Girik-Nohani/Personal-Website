// app/components/ui/WriteupListItem.tsx
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { formatProjectDate } from '@/lib/utils'
import type { Writeup } from '@/types/content'

interface WriteupListItemProps {
  writeup: Writeup
  index: number // 0-based position, used to render the "01", "02"... number
}

export function WriteupListItem({ writeup, index }: WriteupListItemProps) {
  const number = String(index + 1).padStart(2, '0')

  return (
    <Link
      href={`/writeups/${writeup.slug}`}
      className="group flex items-center justify-between gap-sm py-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal"
    >
      <div className="flex min-w-0 items-center gap-md">
        <span className="shrink-0 font-mono text-detail font-semibold text-text-quaternary">
          {number}
        </span>
        <div className="flex min-w-0 flex-col gap-xs">
          <h4 title={writeup.title} className="truncate font-display text-title-sm font-semibold text-accent-teal transition-colors group-hover:text-accent-yellow">
            {writeup.title}
          </h4>
          <p className="font-mono text-detail font-normal text-text-tertiary">
            {formatProjectDate(writeup.publishedDate)}
          </p>
        </div>
      </div>
      <ArrowRight
        className="h-5 w-5 shrink-0 text-text-muted transition-colors group-hover:text-accent-teal"
        aria-hidden="true"
      />
    </Link>
  )
}