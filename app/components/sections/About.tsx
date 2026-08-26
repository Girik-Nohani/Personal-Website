import Image from 'next/image'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AnimatedArrow } from '@/components/ui/AnimatedArrow'
import { MobileAnimatedArrow } from '../ui/MobileAnimatedArrow'
import { SOCIAL_ICON_MAP, getIconLinks } from '@/lib/social-icons'
import type { SocialLink } from '@/types/content'

interface AboutProps {
  heading: string
  bioText: string[]
  image: string
  imageAlt: string
  socialLinks: SocialLink[]
  resumeUrl?: string
}

export function About({
  heading,
  bioText,
  image,
  imageAlt,
  socialLinks,
  resumeUrl,
}: AboutProps) {
  const iconLinks = getIconLinks(socialLinks)

  return (
    <div className="bg-background md:pb-xl lg:py-xl">
      <div className="mx-auto max-w-6xl px-6 py-xl">
        <SectionHeading number="01" title="About" />

        <div className="mt-xl flex flex-col gap-lg lg:flex-row lg:items-start">
          
          {/* About Image */}
          <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-3xl bg-surface lg:aspect-auto lg:h-(--size-about-image) lg:w-(--size-about-image)">
            <Image 
              src={image} 
              alt={imageAlt} 
              fill 
              className="object-cover" 
            />
          </div>

          {/* About content */}
          <div className="flex flex-col">
            <h3 className="font-display text-about-heading font-semibold leading-tight text-accent-teal">
              {heading}
            </h3>

            <div className="mt-md max-w-3xl space-y-xs">
              {bioText.map((para, i) => (
                <p
                  key={i}
                  className="font-display text-body text-text-tertiary"
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-sm flex justify-center lg:hidden">
              <MobileAnimatedArrow id="about-mobile" />
            </div>

            <div className="mt-sm flex flex-col items-center gap-sm lg:flex-row lg:items-center">
              <a
                href={resumeUrl}
                download
                className="flex h-cta-btn w-full items-center justify-center rounded-md border border-accent-teal font-mono text-base font-bold uppercase tracking-wide text-accent-teal transition-colors hover:bg-accent-teal/10 sm:w-cta-btn lg:w-cta-btn"
              >
                Download CV
              </a>

              <div className="flex items-center justify-center gap-sm lg:justify-start">
                {iconLinks.map(({ platform, url }) => {
                  const Icon = SOCIAL_ICON_MAP[platform]
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={platform}
                      className="flex h-(--size-about-icon) w-(--size-about-icon) items-center justify-center rounded-xl bg-icon-bg text-text-primary transition-colors hover:bg-icon-bg/80"
                    >
                      <Icon size={20} />
                    </a>
                  )
                })}
                {/* Animated arrow */}
                <div className="relative -translate-y-(--spacing-about-arrow-offset-y) translate-x-about-arrow-offset-x hidden lg:block">
                  <AnimatedArrow id='about' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}