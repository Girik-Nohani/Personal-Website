// studio/schemaTypes/writeup.ts
import { defineField, defineType } from "sanity";
import { richBodyBlocks } from "./shared/richBodyBlocks";

export const writeup = defineType({
  name: "writeup",
  title: "Writeup",
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
      title: "Title",
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
      name: "publishedDate",
      title: "Published Date",
      description: "Shown in the homepage list and on the writeup page.",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      description:
        'Short labels shown next to the date in the homepage writeup list (e.g. "Web", "Forensics", "OSINT").',
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description:
        "Short summary used for search engines and link previews (not shown in the homepage list itself).",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "writeupBody",
      title: "Full Writeup Content",
      description:
        "Build the writeup freely — headings, paragraphs, bullet/numbered lists, bold/italic/underline, links, images, code snippets, and dividers, in any order. The order here is the order it renders on the page.",
      type: "array",
      of: richBodyBlocks,
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "order",
      title: "Order",
      description:
        "Controls position in the homepage list — lower numbers appear first.",
      type: "number",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "publishedDate" },
  },
});
