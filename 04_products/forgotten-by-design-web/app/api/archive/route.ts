import { NextResponse } from "next/server";
import { projectId } from "@/sanity/env";
import { getClient } from "@/sanity/lib/client";
import { ARCHIVE_ALL_QUERY, ALL_TOPICS_QUERY } from "@/sanity/queries";

export const revalidate = 60;

export async function GET() {
  if (!projectId) {
    return NextResponse.json({ investigations: [], clips: [], docs: [], topics: [] });
  }

  try {
    const client = getClient();
    const [archiveData, topics] = await Promise.all([
      client.fetch(ARCHIVE_ALL_QUERY),
      client.fetch(ALL_TOPICS_QUERY),
    ]);

    return NextResponse.json({ ...archiveData, topics });
  } catch {
    return NextResponse.json({ error: "Failed to fetch archive" }, { status: 500 });
  }
}
