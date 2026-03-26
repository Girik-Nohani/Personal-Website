import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

import { dataset, projectId } from './sanity/env'
import { schemaTypes } from './sanity/schema'
import { structure } from './sanity/structure'

const singletonTypes = new Set(['siteSettings', 'navigation', 'seoDefaults'])

export default defineConfig({
  name: 'default',
  title: 'Girik Nohani Portfolio',
  projectId,
  dataset,
  plugins: [deskTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
})
