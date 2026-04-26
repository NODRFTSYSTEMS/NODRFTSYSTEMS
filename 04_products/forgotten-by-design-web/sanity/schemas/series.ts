import { defineField, defineType } from "sanity";
import { BookIcon } from "@sanity/icons";

export const series = defineType({
  name: "series",
  title: "Series",
  type: "document",
  icon: BookIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "topicCluster",
      title: "Topic Cluster",
      type: "string",
      options: {
        list: [
          { title: "Erased History", value: "erased-history" },
          { title: "Digital Erasure", value: "digital-erasure" },
          { title: "Folklore-Horror Bridges", value: "folklore-horror" },
          { title: "Institutional Contradictions", value: "institutional" },
          { title: "Archaeology Adjacent", value: "archaeology" },
          { title: "Cultural Memory", value: "cultural-memory" },
        ],
      },
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "title", media: "coverImage" },
  },
});
