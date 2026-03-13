import {
  fetchRadiostations,
  fetchPlaylist,
  fetchStationPlaylist,
  buildStreamUrlForStation,
  type Radiostation,
  type PlaylistNode,
} from "@/lib/soundalive-api";
import { NextResponse } from "next/server";

const FALLBACK_STATIONS: Radiostation[] = [
  { name: "Sound Alive Radio", url: "https://soundaliveradio.net/" },
  { name: "Sound Alive Rock", url: "https://rock.soundaliveradio.net/" },
  { name: "Sound Alive Talk", url: "https://talk.soundaliveradio.net/" },
  { name: "Sound Alive House", url: "https://house.soundaliveradio.net/" },
];

const STATIC_FALLBACK_STREAMS: Record<string, string[]> = {
  "https://soundaliveradio.net": [
    "https://evernode8.sbnodes.org:30833/live",
    "https://takeme2.runonevernode.cloud:30235/live",
  ],
  "https://rock.soundaliveradio.net": [
    "https://takeme1.runonevernode.cloud:30133/live",
    "https://au34.evernodeau.com:36525/live",
    "https://evernode8.sbnodes.org:30831/live",
  ],
  "https://talk.soundaliveradio.net": [
    "https://evernode26.poweredbyvirtum.xyz:32633/live",
    "https://node22.evernodebyvirtum.xyz:32235/live",
    "https://evernode8.infoevernode.xyz:30831/live",
  ],
  "https://house.soundaliveradio.net": [
    "https://evernode8.poweredbyvirtum.xyz:30833/live",
    "https://evernode8.infoevernode.xyz:30835/live",
    "https://au35.evernodeau.com:36525/live",
  ],
};

/**
 * Order of operations:
 * 1. Radiostations first - list channel base URLs.
 * 2. For each station, fetch {stationBase}/playlist.json in parallel.
 * 3. Return streamUrls[] + primary streamUrl with safe fallback behavior.
 */

function dedupeUrls(urls: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const url of urls) {
    if (!url || seen.has(url)) continue;
    seen.add(url);
    result.push(url);
  }
  return result;
}

function staticFallbackForStation(stationUrl: string): string[] {
  const normalized = stationUrl.replace(/\/$/, "");
  return STATIC_FALLBACK_STREAMS[normalized] ?? [];
}

export async function GET() {
  let stations: Radiostation[];
  try {
    stations = await fetchRadiostations();
  } catch {
    stations = FALLBACK_STATIONS;
  }
  if (stations.length === 0) {
    return NextResponse.json(FALLBACK_STATIONS);
  }

  const stationPlaylists = await Promise.allSettled(
    stations.map((station) => fetchStationPlaylist(station.url))
  );

  let fallbackTemplateNodes: PlaylistNode[] = [];
  try {
    fallbackTemplateNodes = await fetchPlaylist();
  } catch {
    // If global playlist is unavailable we still return station-specific fallback streams.
  }

  const withStreams = stations.map((station, index) => {
    const stationStreams =
      stationPlaylists[index]?.status === "fulfilled"
        ? stationPlaylists[index].value
        : [];

    const fallbackStreams = fallbackTemplateNodes.map((node) =>
      buildStreamUrlForStation(station.url, node)
    );
    const staticFallbackStreams = staticFallbackForStation(station.url);

    const streamUrls = dedupeUrls([
      ...stationStreams,
      ...staticFallbackStreams,
      ...fallbackStreams,
    ]);

    return {
      ...station,
      streamUrls,
      streamUrl: streamUrls[0] ?? null,
    };
  });

  return NextResponse.json(withStreams);
}
