'use client'

import { useEffect, useMemo, useState } from 'react'
import { Home, User, Folder, Mail } from 'lucide-react'

type Props = Record<string, never>

export default function Navbar(props: Props) {
  void props

  const navLinks = useMemo(
    () => [
      { label: 'Home', href: '#hero', icon: Home },
      { label: 'About', href: '#about', icon: User },
      { label: 'Projects', href: '#projects', icon: Folder },
      { label: 'Contact', href: '#contact', icon: Mail },
    ],
    [],
  )

  const [activeHref, setActiveHref] = useState('#hero')
  const [isScrolled, setIsScrolled] = useState(false)

  // ===============================
  // ACTIVE SECTION DETECTION
  // ===============================
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'projects', 'contact']

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (elements.length === 0) return

    const ratios: Record<string, number> = {}

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id
          ratios[id] = entry.isIntersecting ? entry.intersectionRatio : 0
        }

        let bestId: string | null = null
        let bestRatio = 0

        for (const id of sectionIds) {
          const r = ratios[id] ?? 0
          if (r > bestRatio) {
            bestRatio = r
            bestId = id
          }
        }

        if (bestId) setActiveHref(`#${bestId}`)
      },
      {
        threshold: [0.2, 0.4, 0.6],
        rootMargin: '-20% 0px -60% 0px',
      },
    )

    for (const el of elements) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // ===============================
  // SCROLL STATE
  // ===============================
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ===============================
  // SCROLL HANDLER
  // ===============================
  const scrollToHref = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const onNavClick = (href: string) => {
    setActiveHref(href)
    scrollToHref(href)
  }

  return (
    <>
      {/* ===============================
          DESKTOP NAVBAR
      =============================== */}
      <div className="fixed top-6 left-1/2 z-50 hidden -translate-x-1/2 md:flex">
        <div
          className={`flex h-nav-desktop min-w-[34rem] px-10 items-center justify-center gap-8 rounded-card bg-card transition-all duration-200 ${
            isScrolled
              ? 'border border-divider backdrop-blur-md'
              : 'border border-transparent backdrop-blur-sm'
          }`}
        >
          {navLinks.map((link) => {
            const isActive = activeHref === link.href

            return (
              <a
  key={link.href}
  href={link.href}
  onClick={(e) => {
    e.preventDefault()
    onNavClick(link.href)
  }}
  className="group relative inline-flex items-center justify-center font-exo2 text-[13px] font-semibold uppercase tracking-[0.06em] text-gray-3 transition-colors duration-200 hover:text-gray-1"
>
  <span className={isActive ? 'text-yellow' : ''}>
    {isActive ? `#${link.label}` : link.label}
  </span>

  <span
    className={`absolute left-0 -bottom-1 h-[2px] bg-yellow transition-all duration-300 ${
      isActive ? 'w-full' : 'w-0 group-hover:w-full'
    }`}
  />
</a>
            )
          })}
        </div>
      </div>

      {/* ===============================
          MOBILE ICON NAVBAR
      =============================== */}
      <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 md:hidden">
        <div
          className={`flex h-nav-mobile items-center justify-between gap-6 px-6 rounded-card bg-card transition-all duration-200 ${
            isScrolled
              ? 'border border-divider backdrop-blur-md'
              : 'border border-transparent backdrop-blur-sm'
          }`}
        >
          {navLinks.map((link) => {
            const isActive = activeHref === link.href
            const Icon = link.icon

            return (
              <button
                key={link.href}
                onClick={() => onNavClick(link.href)}
                className="flex h-full flex-col items-center justify-center transition-all active:scale-90"
              >
                <span
                  className={`flex items-center justify-center transition-all duration-200 ${
                    isActive
                      ? 'text-yellow scale-105'
                      : 'text-gray-3 hover:text-gray-2'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}