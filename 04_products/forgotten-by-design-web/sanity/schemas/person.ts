import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export const person = defineType({
  name: "person",
  title: "Person Reference",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "string",
    }),
    defineField({
      name: "affiliation",
      title: "Affiliation / Organization",
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
    select: { title: "name", subtitle: "affiliation" },
  },
});
