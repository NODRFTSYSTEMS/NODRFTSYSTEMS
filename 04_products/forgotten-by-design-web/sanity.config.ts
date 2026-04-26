import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "Forgotten by Design",
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Forgotten by Design")
          .items([
            S.listItem()
              .title("Investigations")
              .child(S.documentTypeList("investigation")),
            S.listItem()
              .title("Clips & Shorts")
              .child(S.documentTypeList("clip")),
            S.listItem()
              .title("Documentation Packages")
              .child(S.documentTypeList("documentationPackage")),
            S.divider(),
            S.listItem()
              .title("Series")
              .child(S.documentTypeList("series")),
            S.listItem()
              .title("Topics")
              .child(S.documentTypeList("topic")),
            S.divider(),
            S.listItem()
              .title("People")
              .child(S.documentTypeList("person")),
            S.listItem()
              .title("Institutions")
              .child(S.documentTypeList("institution")),
            S.listItem()
              .title("Places")
              .child(S.documentTypeList("place")),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
