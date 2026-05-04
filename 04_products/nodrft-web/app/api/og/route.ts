import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title") ?? "NoDrftSystems";
  const locale = searchParams.get("locale") ?? "en";

  const url = new URL(req.url);
  const imageUrl = `${url.origin}/assets/social-og.png`;

  return NextResponse.redirect(imageUrl, {
    headers: {
      "Cache-Control": "public, max-age=86400",
      "x-og-title": title,
      "x-og-locale": locale,
    },
  });
}
