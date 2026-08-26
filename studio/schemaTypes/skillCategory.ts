// studio/schemaTypes/skillCategory.ts
import { defineArrayMember, defineField, defineType } from 'sanity'

export const skillCategory = defineType({
  name: 'skillCategory',
  title: 'Skill Category',
  type: 'document',
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  fields: [
    defineField({
      name: 'id',
      title: 'Slug / ID',
      description: 'Short, unique, URL-safe id — e.g. "networking-systems". Used internally, not shown to visitors.',
      type: 'slug',
      options: { source: 'categoryName', maxLength: 64 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categoryName',
      title: 'Category Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'skills',
      title: 'Skills / Tools',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'skill',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string', validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: 'name' } },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'categoryName', subtitle: 'id.current' },
  },
})