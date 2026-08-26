// studio/schemaTypes/shared/richBodyBlocks.ts
//
// Shared rich-text body config used by both `project.caseStudyBody` and
// `writeup.writeupBody`. Extracted so both content types stay in sync
// automatically instead of drifting — one source of truth for the
// block/image/code/divider members, imported wherever a freeform rich body
// is needed.
import { defineArrayMember, defineField } from "sanity";

export const richBodyBlocks = [
  defineArrayMember({
    type: "block",
    styles: [
      { title: "Normal", value: "normal" },
      { title: "Heading 3", value: "h3" },
      { title: "Heading 4", value: "h4" },
      { title: "Quote", value: "blockquote" },
    ],
    lists: [
      { title: "Bullet", value: "bullet" },
      { title: "Numbered", value: "number" },
    ],
    marks: {
      decorators: [
        { title: "Bold", value: "strong" },
        { title: "Italic", value: "em" },
        { title: "Underline", value: "underline" },
      ],
      annotations: [
        {
          name: "link",
          type: "object",
          title: "Link",
          fields: [{ name: "href", type: "url", title: "URL" }],
        },
      ],
    },
  }),
  defineArrayMember({
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Alt Text",
        type: "string",
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: "caption",
        title: "Caption (optional)",
        type: "string",
      }),
      defineField({
        name: "size",
        title: "Image Size",
        description: "Controls how wide this image renders on the page.",
        type: "string",
        options: {
          list: [
            { title: "Small", value: "small" },
            { title: "Medium", value: "medium" },
            { title: "Full Width", value: "full" },
          ],
          layout: "radio",
        },
        initialValue: "full",
      }),
    ],
  }),
  defineArrayMember({
    type: "code",
    options: {
      withFilename: true,
      languageAlternatives: [
        { title: "Bash", value: "bash" },
        { title: "PowerShell", value: "powershell" },
        { title: "Python", value: "python" },
        { title: "JavaScript", value: "javascript" },
        { title: "TypeScript", value: "typescript" },
        { title: "JSON", value: "json" },
        { title: "YAML", value: "yaml" },
        { title: "Plain Text", value: "text" },
      ],
    },
  }),
  defineArrayMember({ type: "divider" }),
];