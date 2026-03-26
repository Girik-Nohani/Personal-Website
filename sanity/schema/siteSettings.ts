import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'string',
    }),
    defineField({
      name: 'heroCta1Label',
      title: 'Hero CTA 1 Label',
      type: 'string',
      initialValue: 'More about me',
    }),
    defineField({
      name: 'heroCta2Label',
      title: 'Hero CTA 2 Label',
      type: 'string',
      initialValue: 'Get in touch',
    }),
    defineField({
      name: 'heroCta3Label',
      title: 'Hero CTA 3 Label',
      type: 'string',
      initialValue: 'Download CV',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'profilePhoto',
      title: 'Profile Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'cvFile',
      title: 'CV File',
      type: 'file',
      options: { accept: 'application/pdf' },
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'contactIntroText',
      title: 'Contact Intro Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'twitterUrl',
      title: 'Twitter URL',
      type: 'url',
    }),
    defineField({
      name: 'projectsSectionIntro',
      title: 'Projects Section Intro',
      type: 'text',
    }),
    defineField({
      name: 'testimonialsSectionIntro',
      title: 'Testimonials Section Intro',
      type: 'text',
    }),
    defineField({
      name: 'certificationSectionIntro',
      title: 'Certification Section Intro',
      type: 'text',
    }),
  ],
})
