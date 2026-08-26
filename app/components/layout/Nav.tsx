'use client'

import { useEffect, useRef, useState } from 'react'
import { Home, User, FolderKanban, NotebookText, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavLink {
  id: string
  label: string
}

interface NavProps {
  links: NavLink[]
}
const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  home: Home,
  about: User,
  projects: FolderKanban,
  writeups: NotebookText,
  contact: Mail,
}

export function Nav({ links }: NavProps) {
  const [active, setActive] = useState(links[0]?.id ?? '')
  const [hidden, setHidden] = useState(false)
  const [nearFooter, setNearFooter] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )
    links.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [links])

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      const scrollingDown = currentY > lastScrollY.current

      if (Math.abs(currentY - lastScrollY.current) > 10) {
        setHidden(scrollingDown && currentY > 100)
        lastScrollY.current = currentY
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
  const footer = document.querySelector('footer')
  if (!footer) return

  const footerObserver = new IntersectionObserver(
    ([entry]) => setNearFooter(entry.isIntersecting),
    { rootMargin: '0px 0px 80px 0px', threshold: 0 }
  )

  footerObserver.observe(footer)
  return () => footerObserver.disconnect()
}, [])

  return (
    <nav
      className={cn(
        'fixed left-1/2 z-50 -translate-x-1/2',
        'bottom-6 top-auto md:top-6 md:bottom-auto',
        'flex items-center justify-center',
        'w-nav-mobile md:w-nav-desktop h-nav-mobile md:h-nav rounded-nav bg-header backdrop-blur',
        'px-nav-mobile-padding md:px-sm',
        'shadow-lg shadow-accent-teal/10',
        'transition-transform duration-300 motion-reduce:transition-none',
        nearFooter ? 'translate-y-24 md:translate-y-0' : 'translate-y-0',
        hidden && 'md:-translate-y-24'
      )}
    >
      <ul className="flex w-full items-center justify-center gap-sm md:justify-center md:px-md">
        {links.map(({ id, label }) => {
          const Icon = iconMap[id]
          const isActive = active === id

          return (
            <li key={id} className="relative">
              <a
                href={`#${id}`}
                className={cn(
                'relative flex flex-col items-center justify-center gap-nav-underline-gap rounded-full transition-colors',
                'font-mono font-semibold uppercase text-body',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal',
                'py-xs', 'px-xs',
                isActive ? 'text-accent-yellow' : 'text-text-tertiary hover:text-text-primary'
                )}
              >
              <span className="md:hidden">{Icon && <Icon size={20} />}</span>
              <span className="hidden md:inline">{isActive ? `#${label}` : label}</span>
              <span
                  className={cn(
                  'hidden h-px w-nav-underline bg-accent-yellow transition-opacity md:block',
                  isActive ? 'opacity-100' : 'opacity-0'
                    )}
                  aria-hidden="true"
              />
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}