// sanity.config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'
import { schemaTypes } from './studio/schemaTypes'
import { structure } from './studio/structure'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (!projectId) {
  throw new Error(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID — set it in .env.local before running the Studio.'
  )
}

// siteSettings, aboutSection, contactSettings are singletons (one document
// each, edited in place via studio/structure.ts). Hide "Create" and
// "Delete" for these specifically — there's nothing to create a second of,
// and deleting one would break the homepage fetch.
const SINGLETON_TYPES = new Set(['siteSettings', 'aboutSection', 'contactSettings', 'sectionHeadings'])

export default defineConfig({
  name: 'default',
  title: 'Girik Nohani — Portfolio Studio',

  projectId,
  dataset,

  basePath: '/studio',
  
  plugins: [structureTool({ structure }), visionTool(), codeInput()],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(({ action }) => action && ['update', 'publish'].includes(action))
        : input,
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === 'global'
        ? prev.filter((template) => !SINGLETON_TYPES.has(template.templateId))
        : prev,
  },
})