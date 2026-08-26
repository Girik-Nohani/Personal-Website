// app/components/ui/SubSectionHeading.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type SubSectionHeadingAlign = 'left' | 'center' | 'right'

const ALIGN_MAP: Record<SubSectionHeadingAlign, string> = {
  left: 'items-start text-left',
  center: 'items-center text-center',
  right: 'items-end text-right',
}

interface SubSectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: SubSectionHeadingAlign
  accentSlash?: boolean
}

interface FlickerChar {
  char: string
  flickering: boolean
}

const FLICKER_GLYPHS = '⧑℘ỸᘡƳ⧣ᯕᠳᭈủ0123456789#$%&*'
const FLICKER_CHAR_COUNT = 3
const HOLD_DURATION_MIN_MS = 1000
const HOLD_DURATION_MAX_MS = 2000
const REPLAY_INTERVAL_MS = 10000

export function SubSectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  accentSlash = false,
}: SubSectionHeadingProps) {
  const chars = title.split('')
  const [displayChars, setDisplayChars] = useState<FlickerChar[]>(
    chars.map((char) => ({ char, flickering: false }))
  )
  const replayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const runFlicker = () => {
    const validIndices = chars
      .map((char, i) => ({ char, i }))
      .filter(({ char }) => char !== ' ' && !(accentSlash && char === '/'))
      .map(({ i }) => i)

    if (validIndices.length === 0) return

    const picked: number[] = []
    const pool = [...validIndices]
    for (let n = 0; n < Math.min(FLICKER_CHAR_COUNT, pool.length); n++) {
      const randIdx = Math.floor(Math.random() * pool.length)
      picked.push(pool[randIdx])
      pool.splice(randIdx, 1)
    }

    // Swap each picked letter to one random glyph and hold it there.
    setDisplayChars((prev) => {
      const next = [...prev]
      picked.forEach((charIndex) => {
        next[charIndex] = {
          char: FLICKER_GLYPHS[Math.floor(Math.random() * FLICKER_GLYPHS.length)],
          flickering: true,
        }
      })
      return next
    })

    // Hold for a random 1-2s, then revert every picked letter back at once.
    const holdDuration =
      HOLD_DURATION_MIN_MS + Math.random() * (HOLD_DURATION_MAX_MS - HOLD_DURATION_MIN_MS)

    const revertTimeout = setTimeout(() => {
      setDisplayChars((prev) => {
        const next = [...prev]
        picked.forEach((charIndex) => {
          next[charIndex] = { char: chars[charIndex], flickering: false }
        })
        return next
      })
    }, holdDuration)

    timeoutsRef.current.push(revertTimeout)
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    replayIntervalRef.current = setInterval(runFlicker, REPLAY_INTERVAL_MS)

    const timeouts = timeoutsRef.current

    return () => {
      if (replayIntervalRef.current) clearInterval(replayIntervalRef.current)
      timeouts.forEach(clearTimeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={cn('flex flex-col gap-xs', ALIGN_MAP[align])}>
      <p className="font-mono text-eyebrow font-semibold uppercase tracking-wider text-text-tertiary">
        {eyebrow}
      </p>
      <h3 className="font-display text-subheading-title font-semibold uppercase text-accent-yellow">
        {displayChars.map(({ char, flickering }, i) => (
          <span
            key={i}
            className={
              (accentSlash && chars[i] === '/') || flickering
                ? 'text-accent-teal'
                : undefined
            }
          >
            {char}
          </span>
        ))}
      </h3>
      {description && (
        <p className="max-w-(--size-subheading-desc-max-w) font-display text-body font-normal text-text-quaternary">
          {description}
        </p>
      )}
    </div>
  )
}