import { fetchCurrentTitle } from "@/lib/soundalive-api";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  if (!url) {
    return NextResponse.json(
      { error: "Missing url query parameter" },
      { status: 400 }
    );
  }
  try {
    const title = await fetchCurrentTitle(url);
    return NextResponse.json({ title });
  } catch {
    return NextResponse.json({ title: "" });
  }
}
