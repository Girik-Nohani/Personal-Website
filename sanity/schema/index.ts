import type { SchemaTypeDefinition } from 'sanity'

import certification from './certification'
import education from './education'
import experience from './experience'
import navigation from './navigation'
import project from './project'
import seoDefaults from './seoDefaults'
import service from './service'
import siteSettings from './siteSettings'
import skillCategory from './skillCategory'
import testimonial from './testimonial'

export const schemaTypes: SchemaTypeDefinition[] = [
  project,
  skillCategory,
  education,
  certification,
  testimonial,
  service,
  experience,
  siteSettings,
  navigation,
  seoDefaults,
]
