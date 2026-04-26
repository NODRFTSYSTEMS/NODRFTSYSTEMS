import { getClient } from "./client";
import { projectId } from "../env";
import type { QueryParams } from "next-sanity";

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  revalidate = 60,
  tags,
  defaultValue,
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
  defaultValue?: QueryResponse;
}): Promise<QueryResponse> {
  // During build with no project ID configured, return default rather than crashing.
  if (!projectId) {
    return (defaultValue ?? null) as QueryResponse;
  }

  return getClient().fetch<QueryResponse>(query, params, {
    next: {
      revalidate: tags ? false : revalidate,
      tags,
    },
  });
}
