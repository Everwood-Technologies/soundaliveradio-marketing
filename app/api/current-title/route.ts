import { NextResponse } from "next/server";

export const dynamic = "force-static";

// Static export: no request-time data. Returns empty title so build succeeds.
// For live "Now Playing" on GitHub Pages, point the client at an external API.
export function GET() {
  return NextResponse.json({ title: "" });
}
