'use client'

import { useEffect, useState } from 'react'
import { SOCIAL_ICON_MAP, getIconLinks } from '@/lib/social-icons'
 import type { SocialLink, Availability } from '@/types/content'

interface MobileStatusBarProps {
  socialLinks: SocialLink[]
  availability: Availability
}

const STATUS_COLOR_MAP: Record<Availability['status'], string> = {
  available: 'bg-success',
  busy: 'bg-warning',
  unavailable: 'bg-error',
}

export function MobileStatusBar({ socialLinks, availability }: MobileStatusBarProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const heroEl = document.getElementById('home')
    if (!heroEl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
      },
      { threshold: 0 } 
    )

    observer.observe(heroEl)
    return () => observer.disconnect()
  }, [])

  const iconLinks = getIconLinks(socialLinks)

  return (
    <div
      className={`fixed left-(--mobile-topbar-margin) right-(--mobile-topbar-margin) top-(--mobile-topbar-margin) z-50 flex md:hidden items-center justify-between rounded-2xl border-b-2 border-accent-teal bg-header px-md transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
      style={{ height: 'var(--mobile-topbar-height)' }}
    >
      <div className="flex items-center gap-xs">
        <span className="relative flex h-2 w-2">
          <span className={`absolute inline-flex h-full w-full rounded-full ${STATUS_COLOR_MAP[availability.status]} animate-[pulse-available_2s_ease-in-out_infinite]`} />
        </span>
        <span className="font-mono font-medium text-detail text-text-secondary">
          {availability.label}
        </span>
      </div>

      <div className="flex items-center gap-sm">
        {iconLinks.map((link) => {
          const Icon = SOCIAL_ICON_MAP[link.platform]
          return (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.platform}
              className="text-text-primary hover:text-accent-teal transition-colors"
            >
              <Icon size={16} />
            </a>
          )
        })}
      </div>
    </div>
  )
}