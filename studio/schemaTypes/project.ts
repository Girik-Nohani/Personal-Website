// studio/schemaTypes/project.ts
import { defineField, defineType } from "sanity";
import { richBodyBlocks } from "./shared/richBodyBlocks";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      description: "e.g. Website, Security Tool, Internal Tool",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: "techStack",
      title: "Tech Stack (tags)",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "liveLink",
      title: "Live Link (optional)",
      type: "url",
    }),
    defineField({
      name: "bodyHeading",
      title: "Body Section Heading",
      description:
        'Heading shown above the case study content — e.g. "Overview", "The Challenge", "Approach". Editable per project.',
      type: "string",
    }),
    defineField({
      name: "caseStudyBody",
      title: "Full Case Study Content",
      description:
        "Build the case study freely — add paragraphs, headings, images, lists, quotes, and code snippets in any order. The order you arrange them here is the order they render on the page.",
      type: "array",
      of: richBodyBlocks,
    }),
    defineField({
      name: "gallery",
      title: "Gallery Images",
      type: "array",
      of: [
        {
          type: "image",
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured on homepage",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", media: "coverImage", subtitle: "category" },
  },
});
