// studio/schemaTypes/index.ts
import { ctaLink } from './ctaLink'
import { divider } from './divider'
import { sectionHeadings } from './sectionHeadings'
import { siteSettings } from './siteSettings'
import { aboutSection } from './aboutSection'
import { educationEntry } from './educationEntry'
import { certification } from './certification'
import { experienceEntry } from './experienceEntry'
import { skillCategory } from './skillCategory'
import { project } from './project'
import { testimonial } from './testimonial'
import { writeup } from './writeups'
import { contactSettings } from './contactSettings'

export const schemaTypes = [
  // reusable objects first
  ctaLink,
  divider,
  sectionHeadings,
  // singletons
  siteSettings,
  aboutSection,
  contactSettings,
  // collections
  educationEntry,
  certification,
  experienceEntry,
  skillCategory,
  project,
  testimonial,
  writeup,
]