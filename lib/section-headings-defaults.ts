// lib/section-headings-defaults.ts
//
// Fallback content if the `sectionHeadings` singleton hasn't been created/
// published in Studio yet. Mirrors the original hardcoded values each
// section used before this became Sanity-editable — keeps the homepage
// from crashing (or showing blank headings) if that document is missing.
import type { SectionHeadings } from '@/types/content'

export const DEFAULT_SECTION_HEADINGS: SectionHeadings = {
  education: {
    eyebrow: 'Journey so far',
    title: 'Education',
    description:
      'A focused academic track blending fundamental computing knowledge with emerging technologies.',
  },
  certifications: {
    eyebrow: 'My other expertise areas',
    title: 'Certification',
    description:
      'Focused training programs strengthening practical cybersecurity execution, structured penetration testing, and intelligence-driven investigation workflows.',
  },
  experience: {
    eyebrow: 'Years of Work',
    title: 'EXPERIENCE',
    description:
      'A track record built across security-focused roles — from hands-on system defense to structured incident response, each position sharpening a deeper, more deliberate approach to the craft.',
  },
  skills: {
    eyebrow: 'My Expertise Areas',
    title: 'SKILLS / TOOLS',
    description: 'A quick rundown of the tools, systems, and methods I rely on day to day.',
  },
  projects: {
    eyebrow: 'Freelance',
    title: 'MY WORKS',
    description:
      'Selected case studies showcasing engineered systems, secure architecture, and scalable digital solutions.',
  },
  writeups: {
    eyebrow: 'Notes from the field',
    title: 'WRITEUPS',
    description:
      'CTF walkthroughs, forensics breakdowns, and research notes documenting how each challenge was actually solved.',
  },
  testimonials: {
    eyebrow: 'Results of My Work',
    title: 'TESTIMONIALS',
    description:
      'Built with security-first architecture and deliberate execution strategies. These testimonials reflect the reliability, structure, and consistency delivered throughout each collaboration.',
  },
}