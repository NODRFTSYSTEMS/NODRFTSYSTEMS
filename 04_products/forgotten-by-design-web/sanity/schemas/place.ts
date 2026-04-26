import { defineField, defineType } from "sanity";
import { PinIcon } from "@sanity/icons";

export const place = defineType({
  name: "place",
  title: "Place Reference",
  type: "document",
  icon: PinIcon,
  fields: [
    defineField({
      name: "name",
      title: "Place Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
    }),
    defineField({
      name: "region",
      title: "Region / State",
      type: "string",
    }),
    defineField({
      name: "notes",
      title: "Research Notes",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "country" },
  },
});
