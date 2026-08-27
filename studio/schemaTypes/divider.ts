// studio/schemaTypes/divider.ts
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