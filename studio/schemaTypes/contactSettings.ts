// studio/schemaTypes/contactSettings.ts
import { defineField, defineType } from 'sanity'

export const contactSettings = defineType({
  name: 'contactSettings',
  title: 'Contact Section Settings',
  type: 'document',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'questionsHeading',
      title: 'Questions Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'questionsBody',
      title: 'Questions Body',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'privacyNote',
      title: 'Privacy Note',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'connectEyebrow',
      title: 'Connect Eyebrow',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'connectHeading',
      title: 'Connect Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'recipientEmail',
      title: 'Form Recipient Email',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'formSuccessMessage',
      title: 'Form Success Message',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})