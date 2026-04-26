import { defineField, defineType, defineArrayMember } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export const documentationPackage = defineType({
  name: "documentationPackage",
  title: "Documentation Package",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "object",
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
    }),
    defineField({
      name: "parentInvestigation",
      title: "Parent Investigation",
      type: "reference",
      to: [{ type: "investigation" }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    }),
    // Claims-to-evidence table as an array of claim objects
    defineField({
      name: "claims",
      title: "Claims & Evidence",
      type: "array",
      of: [
        defineArrayMember({
          name: "claimEntry",
          title: "Claim Entry",
          type: "object",
          fields: [
            defineField({ name: "claim", title: "Claim / Finding", type: "text", rows: 2 }),
            defineField({
              name: "sourceType",
              title: "Source Type",
              type: "string",
              options: {
                list: [
                  { title: "Primary", value: "primary" },
                  { title: "Supporting", value: "supporting" },
                  { title: "Contextual", value: "contextual" },
                ],
              },
            }),
            defineField({ name: "reference", title: "Reference", type: "string" }),
            defineField({ name: "notes", title: "Notes", type: "text", rows: 2 }),
          ],
          preview: {
            select: { title: "claim", subtitle: "sourceType" },
          },
        }),
      ],
    }),
    // Primary source screenshots
    defineField({
      name: "screenshots",
      title: "Source Screenshots",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
            defineField({ name: "archiveId", title: "Archive Identifier / Source Note", type: "string" }),
            defineField({ name: "caption", title: "Caption", type: "text", rows: 2 }),
          ],
          preview: {
            select: { title: "archiveId", media: "image" },
          },
        }),
      ],
    }),
    // Lacuna note
    defineField({
      name: "lacunaNote",
      title: "Lacuna Note",
      description: "What cannot be proven and why — epistemic transparency",
      type: "object",
      fields: [
        defineField({ name: "en", title: "English", type: "array", of: [{ type: "block" }] }),
      ],
    }),
    // Reference groupings
    defineField({
      name: "primarySources",
      title: "Primary Sources",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url" }),
            defineField({ name: "notes", title: "Notes", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
    }),
    defineField({
      name: "supportingSources",
      title: "Supporting Sources",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url" }),
            defineField({ name: "notes", title: "Notes", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
    }),
    defineField({
      name: "contextualSources",
      title: "Contextual Sources",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url" }),
            defineField({ name: "notes", title: "Notes", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
    }),
    // SEO
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
  ],
  groups: [
    { name: "seo", title: "SEO" },
  ],
  preview: {
    select: { title: "title.en", subtitle: "parentInvestigation.title.en" },
    prepare({ title, subtitle }) {
      return { title: title || "Untitled Package", subtitle: subtitle ? `← ${subtitle}` : "" };
    },
  },
});
