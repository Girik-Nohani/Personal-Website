// studio/schemaTypes/educationEntry.ts
import { defineField, defineType } from "sanity";

export const educationEntry = defineType({
  name: "educationEntry",
  title: "Education",
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
      name: "degreeTitle",
      title: "Degree / Program",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "institution",
      title: "Institution",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "institutionUrl",
      title: "Institution Website (optional)",
      description:
        "If filled in, the graduation-cap icon links out to this page. Leave blank to render the icon as non-clickable.",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "startYear",
      title: "Start Year",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endYear",
      title: "End Year (leave blank if ongoing)",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "degreeTitle", subtitle: "institution" },
  },
});
