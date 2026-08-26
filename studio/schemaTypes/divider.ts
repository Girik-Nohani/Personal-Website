// studio/schemaTypes/divider.ts
//
// A content-free marker block editors can drop into any rich body field
// (Case Study or Writeup content) to render a horizontal divider line.
// No fields — its presence in the array is the entire signal.
import { defineType } from "sanity";

export const divider = defineType({
  name: "divider",
  title: "Divider",
  type: "object",
  fields: [
    {
      name: "note",
      title: "Note",
      type: "string",
      description: "Not shown on the site — just a label so this reads clearly in the content list below.",
      initialValue: "── divider ──",
      readOnly: true,
    },
  ],
  preview: {
    prepare: () => ({ title: "── Divider ──" }),
  },
});