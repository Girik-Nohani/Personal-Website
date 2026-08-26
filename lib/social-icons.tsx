// lib/social-icons.tsx
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import type { ComponentType } from 'react'
import type { SocialLink } from '@/types/content'

export const SOCIAL_ICON_MAP: Record<string, ComponentType<{ className?: string; size?: number }>> = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
  'Twitter/X': FaXTwitter,
}

export function getIconLinks(socialLinks: SocialLink[]) {
  return socialLinks.filter((link) => SOCIAL_ICON_MAP[link.platform])
}