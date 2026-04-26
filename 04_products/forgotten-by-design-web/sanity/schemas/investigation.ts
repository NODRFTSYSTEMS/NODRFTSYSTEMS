import { defineField, defineType, defineArrayMember } from "sanity";
import { SearchIcon } from "@sanity/icons";

export const investigation = defineType({
  name: "investigation",
  title: "Investigation",
  type: "document",
  icon: SearchIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "evidence", title: "Evidence & Docs" },
    { name: "meta", title: "Metadata" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // --- Content group ---
    defineField({
      name: "title",
      title: "Title",
      type: "object",
      group: "content",
      fields: [
        defineField({ name: "en", title: "English", type: "string", validation: (Rule) => Rule.required() }),
      ],
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.en" },
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "format",
      title: "Format",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Long-form Investigation", value: "long-form" },
          { title: "Short / Clip", value: "short" },
          { title: "Documentation", value: "documentation" },
        ],
        layout: "radio",
      },
      initialValue: "long-form",
    }),
    defineField({
      name: "abstract",
      title: "Abstract",
      description: "1–2 sentence summary shown on cards and below the title",
      type: "object",
      group: "content",
      fields: [
        defineField({ name: "en", title: "English", type: "text", rows: 3 }),
      ],
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      group: "content",
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
      group: "content",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
      group: "content",
    }),
    defineField({
      name: "runtime",
      title: "Runtime (e.g. 24:15)",
      type: "string",
      group: "content",
    }),
    // Claims block
    defineField({
      name: "claims",
      title: "Key Claims / What This Investigation Argues",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
      validation: (Rule) => Rule.max(5),
    }),
    // Transcript
    defineField({
      name: "transcript",
      title: "Transcript",
      type: "object",
      group: "content",
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "array",
          of: [{ type: "block" }],
        }),
      ],
    }),
    // --- Evidence group ---
    defineField({
      name: "evidenceStatus",
      title: "Evidence Status",
      type: "string",
      group: "evidence",
      options: {
        list: [
          { title: "Documented", value: "documented" },
          { title: "In Progress", value: "inProgress" },
          { title: "Supplemental", value: "supplemental" },
        ],
        layout: "radio",
      },
      initialValue: "inProgress",
    }),
    defineField({
      name: "documentationPage",
      title: "Documentation Package",
      type: "reference",
      to: [{ type: "documentationPackage" }],
      group: "evidence",
    }),
    // Evidence preview items (2–3 source images or pull quotes)
    defineField({
      name: "evidencePreview",
      title: "Evidence Preview",
      description: "2–3 source images or pull quotes shown on the investigation page",
      type: "array",
      group: "evidence",
      of: [
        defineArrayMember({
          type: "object",
          name: "evidenceItem",
          fields: [
            defineField({
              name: "type",
              title: "Type",
              type: "string",
              options: { list: [{ title: "Image", value: "image" }, { title: "Quote", value: "quote" }], layout: "radio" },
            }),
            defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
            defineField({ name: "quote", title: "Pull Quote", type: "text", rows: 3 }),
            defineField({ name: "sourceLabel", title: "Source Label", type: "string" }),
          ],
          preview: {
            select: { title: "sourceLabel", media: "image" },
          },
        }),
      ],
    }),
    // --- Metadata group ---
    defineField({
      name: "series",
      title: "Series",
      type: "array",
      of: [{ type: "reference", to: [{ type: "series" }] }],
      group: "meta",
    }),
    defineField({
      name: "topics",
      title: "Topics",
      type: "array",
      of: [{ type: "reference", to: [{ type: "topic" }] }],
      group: "meta",
    }),
    defineField({
      name: "relatedInvestigations",
      title: "Related Investigations",
      type: "array",
      of: [{ type: "reference", to: [{ type: "investigation" }] }],
      group: "meta",
    }),
    defineField({
      name: "relatedClips",
      title: "Related Clips",
      type: "array",
      of: [{ type: "reference", to: [{ type: "clip" }] }],
      group: "meta",
    }),
    // --- SEO group ---
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
      group: "seo",
    }),
    defineField({
      name: "shareImage",
      title: "Share Image",
      type: "image",
      group: "seo",
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
      group: "meta",
    }),
  ],
  preview: {
    select: {
      title: "title.en",
      media: "thumbnail",
      subtitle: "evidenceStatus",
    },
    prepare({ title, media, subtitle }) {
      const statusLabel: Record<string, string> = {
        documented: "✓ Documented",
        inProgress: "⏳ In Progress",
        supplemental: "◎ Supplemental",
      };
      return {
        title: title || "Untitled Investigation",
        subtitle: statusLabel[subtitle] || subtitle,
        media,
      };
    },
  },
});
