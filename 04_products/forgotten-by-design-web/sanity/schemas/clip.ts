import { defineField, defineType } from "sanity";
import { PlayIcon } from "@sanity/icons";

export const clip = defineType({
  name: "clip",
  title: "Short / Clip",
  type: "document",
  icon: PlayIcon,
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
      name: "abstract",
      title: "Abstract",
      description: "1–2 sentence summary shown on cards",
      type: "object",
      fields: [
        defineField({ name: "en", title: "English", type: "text", rows: 2 }),
      ],
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "topics",
      title: "Topics",
      type: "array",
      of: [{ type: "reference", to: [{ type: "topic" }] }],
    }),
  ],
  preview: {
    select: { title: "title.en", media: "thumbnail" },
    prepare({ title, media }) {
      return { title: title || "Untitled Clip", media };
    },
  },
});
