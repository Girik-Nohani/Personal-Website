// app/components/sections/ContactInfo.tsx
import { ContactArrow } from '@/components/ui/ContactArrow'
import { SOCIAL_ICON_MAP, getIconLinks } from '@/lib/social-icons'
import type { ContactSettings, SocialLink } from '@/types/content'

interface ContactInfoProps {
  contact: ContactSettings
  socialLinks: SocialLink[]
}

export function ContactInfo({ contact, socialLinks }: ContactInfoProps) {
  const iconLinks = getIconLinks(socialLinks)

  return (
    <div className="flex flex-col">
      <h3 className="font-display text-title-lg font-semibold text-accent-teal">
        {contact.questionsHeading}
      </h3>

      <p className="mt-md font-display text-body text-text-secondary">{contact.questionsBody}</p>
      <p className="mt-sm font-display text-body text-text-quaternary">{contact.privacyNote}</p>

      <div className="mt-lg h-xs w-3/4 bg-accent-teal motion-reduce:transition-none" />

      <div className="mt-md flex items-center gap-sm">
        <div>
          <p className="font-mono text-eyebrow uppercase tracking-widest text-accent-yellow">
            {contact.connectEyebrow}
          </p>
          <p className="mt-xs font-mono text-text-secondary">{contact.connectHeading}</p>
        </div>

        <div className="relative translate-x-contact-arrow-offset">
          <ContactArrow id="contact" />
        </div>

        <ul className="flex items-center gap-sm">
          {iconLinks.map(({ platform, url }) => {
            const Icon = SOCIAL_ICON_MAP[platform]
            return (
              <li key={platform}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={platform}
                  className="flex h-(--size-contact-social-btn) w-(--size-contact-social-btn) items-center justify-center rounded-lg bg-surface-alt text-text-primary transition-colors hover:bg-accent-teal/20 motion-reduce:transition-none"
                >
                  <Icon className="h-(--size-contact-social-icon) w-(--size-contact-social-icon)" />
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}