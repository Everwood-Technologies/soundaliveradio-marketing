import { fetchPlaylist } from "@/lib/soundalive-api";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  try {
    const data = await fetchPlaylist();
    return NextResponse.json(data);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to fetch playlist";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
