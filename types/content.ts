import type { PortableTextBlock } from '@portabletext/types'
export interface CtaLink { label: string; href: string }
export interface SocialLink { platform: "LinkedIn" | "GitHub" | "Twitter/X" | "Email" | "Other"; url: string }
export type AvailabilityStatus = 'available' | 'busy' | 'unavailable'
export interface Availability { label: string; status: AvailabilityStatus }

export interface SiteSettings {
  name: string
  roles: string[]
  tagline: string
  primaryCta: CtaLink
  secondaryCta: CtaLink
  resumeFile?: string
  heroVideo?: string
  heroVideoPoster?: string
  socialLinks: SocialLink[]
  availability: Availability
}

export interface SubSectionHeadingContent {
  eyebrow: string
  title: string
  description: string
}

export interface SectionHeadings {
  education: SubSectionHeadingContent
  certifications: SubSectionHeadingContent
  experience: SubSectionHeadingContent
  skills: SubSectionHeadingContent
  projects: SubSectionHeadingContent
  writeups: SubSectionHeadingContent
  testimonials: SubSectionHeadingContent
}

export interface AboutSection {
  heading: string
  bioText: string[]
  image: string
  imageAlt: string
}

export interface EducationEntry {
  _id: string
  degreeTitle: string
  institution: string
  institutionUrl?: string
  startYear: string
  endYear?: string
  description: string
  order: number
}

export interface Certification {
  _id: string
  title: string
  issuer: string
  year: string
  description: string
  order: number
}

export interface ExperienceEntry {
  _id: string
  company: string
  role: string
  isCurrent: boolean
  startYear: string
  endYear?: string
  description: string[]          
  descriptionStyle: 'bullets' | 'paragraph'
  order: number
}

export interface Skill { name: string }
export interface SkillCategory {
  id: string
  categoryName: string
  description?: string
  skills: Skill[]
  order: number
}

export interface Project {
  _id: string
  title: string
  slug: string
  coverImage: string
  category: string
  shortDescription: string
  techStack: string[]
  date: string
  liveLink?: string
  bodyHeading?: string
  caseStudyBody: PortableTextBlock[]
  gallery?: { url: string; alt: string }[]
  featured: boolean
  order: number
}

export interface Writeup {
  _id: string
  title: string
  slug: string
  publishedDate: string
  excerpt?: string
  writeupBody: PortableTextBlock[]
  order: number
}

export interface Testimonial {
  _id: string
  name: string
  role: string
  quote: string
  avatar?: string
  order: number
}

export interface ContactSettings {
  eyebrow: string
  heading: string           
  questionsHeading: string     
  questionsBody: string         
  privacyNote: string         
  connectEyebrow: string       
  connectHeading: string       
  recipientEmail: string
  formSuccessMessage: string
}

export interface ContactFormData {
  name: string
  email: string
  subject?: string
  message: string
  honeypot?: string
}