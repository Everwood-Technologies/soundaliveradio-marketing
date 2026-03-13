import { NextResponse } from "next/server";

export const dynamic = "force-static";

// GitHub Pages static export cannot proxy request-time stream URLs.
export function GET() {
  return NextResponse.json({
    available: false,
    error: "Stream proxy is unavailable in static export mode.",
  });
}
