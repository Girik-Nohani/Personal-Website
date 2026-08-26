// studio/schemaTypes/siteSettings.ts
import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "roles",
      title: "Roles (scramble-text rotation in Hero)",
      description:
        "Each role is shown one at a time with a scramble-in animation, then rotates to the next.",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA Button",
      type: "ctaLink",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA Button",
      type: "ctaLink",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "resumeFile",
      title: "Downloadable CV",
      type: "file",
      options: { accept: ".pdf" },
    }),
    defineField({
      name: "heroVideo",
      title: "Hero Background Video",
      description:
        "Looping background video behind the hero headline. Keep this small (under 15MB) — it loads on every homepage visit and counts against your Sanity bandwidth. A short, compressed MP4 loop works best.",
      type: "file",
      options: { accept: "video/*" },
      validation: (rule) =>
        rule.custom(async (value, { getClient }) => {
          if (!value?.asset?._ref) return true;
          const client = getClient({ apiVersion: "2025-01-01" });
          const size: number | null = await client.fetch(
            `*[_id == $id][0].size`,
            { id: value.asset._ref },
          );
          const MAX_BYTES = 15 * 1000 * 1000; // 15MB
          if (size && size > MAX_BYTES) {
            return `Video must be under 15MB (currently ${(size / 1_000_000).toFixed(1)}MB). Compress it before uploading — this file loads on every homepage visit.`;
          }
          return true;
        }),
    }),
    defineField({
      name: "heroVideoPoster",
      title: "Hero Video Poster Image",
      description:
        "Shown while the video loads, and as a fallback if video fails to load.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "availability",
      title: "Availability Status",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "status",
          title: "Status",
          type: "string",
          options: {
            list: [
              { title: "Available", value: "available" },
              { title: "Busy", value: "busy" },
              { title: "Unavailable", value: "unavailable" },
            ],
            layout: "radio",
          },
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "socialLink",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: ["LinkedIn", "GitHub", "Twitter/X", "Email", "Other"],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "platform", subtitle: "url" },
          },
        }),
      ],
    }),
  ],
});
