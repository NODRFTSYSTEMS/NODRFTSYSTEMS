import { defineField, defineType } from "sanity";
import { OlistIcon } from "@sanity/icons";

export const institution = defineType({
  name: "institution",
  title: "Institution Reference",
  type: "document",
  icon: OlistIcon,
  fields: [
    defineField({
      name: "name",
      title: "Institution Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Government", value: "government" },
          { title: "Religious", value: "religious" },
          { title: "Academic", value: "academic" },
          { title: "Military", value: "military" },
          { title: "Corporate", value: "corporate" },
          { title: "Media", value: "media" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "country",
      title: "Country",
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
    select: { title: "name", subtitle: "type" },
  },
});
