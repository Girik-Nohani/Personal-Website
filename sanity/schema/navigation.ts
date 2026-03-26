import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'navLinks',
      title: 'Nav Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'href',
              title: 'Href',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'navCtaLabel',
      title: 'Nav CTA Label',
      type: 'string',
      initialValue: 'Download CV',
    }),
    defineField({
      name: 'logoText',
      title: 'Logo Text',
      type: 'string',
      initialValue: 'GN',
    }),
  ],
})
