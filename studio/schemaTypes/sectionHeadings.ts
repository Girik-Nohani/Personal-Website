// studio/schemaTypes/sectionHeadings.ts
import { defineField, defineType } from 'sanity'

function headingGroup(name: string, title: string) {
  return defineField({
    name,
    title,
    type: 'object',
    fields: [
      defineField({
        name: 'eyebrow',
        title: 'Eyebrow',
        type: 'string',
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'description',
        title: 'Description',
        type: 'text',
        rows: 2,
        validation: (rule) => rule.required(),
      }),
    ],
  })
}

export const sectionHeadings = defineType({
  name: 'sectionHeadings',
  title: 'Section Headings',
  type: 'document',
  fields: [
    headingGroup('education', 'Education'),
    headingGroup('certifications', 'Certifications'),
    headingGroup('experience', 'Experience'),
    headingGroup('skills', 'Skills'),
    headingGroup('projects', 'Projects'),
    headingGroup('writeups', 'Writeups'),
    headingGroup('testimonials', 'Testimonials'),
  ],
})