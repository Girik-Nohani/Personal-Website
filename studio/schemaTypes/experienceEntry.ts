// studio/schemaTypes/experienceEntry.ts
import { defineField, defineType } from 'sanity'

export const experienceEntry = defineType({
  name: 'experienceEntry',
  title: 'Experience',
  type: 'document',
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  fields: [
    defineField({
      name: 'company',
      title: 'Company / Team',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isCurrent',
      title: 'Current Position',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'startYear',
      title: 'Start Year',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endYear',
      title: 'End Year (leave blank if current)',
      type: 'string',
      hidden: ({ document }) => !!document?.isCurrent,
    }),
    defineField({
      name: 'description',
      title: 'Description Lines',
      description: 'Each line is one bullet, or one paragraph — see Description Style below.',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'descriptionStyle',
      title: 'Description Style',
      type: 'string',
      options: {
        list: [
          { title: 'Bullets', value: 'bullets' },
          { title: 'Paragraph', value: 'paragraph' },
        ],
        layout: 'radio',
      },
      initialValue: 'bullets',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'company', subtitle: 'role' },
  },
})