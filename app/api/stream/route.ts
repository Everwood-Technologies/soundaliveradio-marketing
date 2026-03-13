import { NextResponse } from "next/server";

function isSafeStreamUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl || !isSafeStreamUrl(targetUrl)) {
    return NextResponse.json(
      { error: "Missing or invalid url query parameter" },
      { status: 400 }
    );
  }

  const requestHeaders = new Headers();
  const range = request.headers.get("range");
  if (range) requestHeaders.set("range", range);
  requestHeaders.set(
    "user-agent",
    "Mozilla/5.0 (compatible; SoundAliveRadio/1.0; +https://soundaliveradio.net)"
  );

  try {
    const upstream = await fetch(targetUrl, {
      cache: "no-store",
      headers: requestHeaders,
      next: { revalidate: 0 },
    });

    if (!upstream.body) {
      return NextResponse.json(
        { error: "Upstream stream has no body" },
        { status: 502 }
      );
    }

    const responseHeaders = new Headers();
    const passthrough = [
      "content-type",
      "content-length",
      "accept-ranges",
      "content-range",
      "icy-name",
      "icy-br",
      "icy-genre",
      "icy-url",
      "icy-description",
    ];

    for (const header of passthrough) {
      const value = upstream.headers.get(header);
      if (value) responseHeaders.set(header, value);
    }

    if (!responseHeaders.has("content-type")) {
      responseHeaders.set("content-type", "audio/mpeg");
    }
    responseHeaders.set("cache-control", "no-store, no-cache, must-revalidate");

    return new NextResponse(upstream.body, {
      status: upstream.status,
      headers: responseHeaders,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to connect to upstream stream" },
      { status: 502 }
    );
  }
}
