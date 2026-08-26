// studio/schemaTypes/aboutSection.ts
import { defineField, defineType } from 'sanity'

export const aboutSection = defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Content Heading',
      description: 'Large heading above the bio text (e.g. "Get to know Me...").',
      type: 'string',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'bioText',
      title: 'Bio Paragraphs',
      description:
        'Each item is rendered as its own paragraph, in order. Plain text — not rich text. 1000 characters total across all paragraphs.',
      type: 'array',
      of: [{ type: 'text', rows: 3 }],
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .custom((value) => {
            if (!value) return true
            const totalLength = value.join('').length
            if (totalLength > 1000) {
              return `Bio text must be 1000 characters total or fewer (currently ${totalLength}).`
            }
            return true
          }),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],
})