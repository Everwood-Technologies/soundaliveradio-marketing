import {
  fetchPlaylist,
  fetchRadiostations,
  buildStreamUrlForStation,
  type Radiostation,
} from "@/lib/soundalive-api";
import { NextResponse } from "next/server";

const FALLBACK_STATIONS: Radiostation[] = [
  { name: "Sound Alive Radio", url: "https://soundaliveradio.net/" },
  { name: "Sound Alive Rock", url: "https://rock.soundaliveradio.net/" },
  { name: "Sound Alive Talk", url: "https://talk.soundaliveradio.net/" },
  { name: "Sound Alive House", url: "https://house.soundaliveradio.net/" },
];

/**
 * Order of operations:
 * 1. Playlist first - what live streams are available (host/port/path or URL).
 * 2. Radiostations - genre subdomains (hiphop = no subdomain, rock = rock.<host>, house = house.<host>, talk = talk.<host>).
 * 3. Each station gets streamUrl = its subdomain + playlist stream (port/path). Current-title is run on each station url.
 */
export async function GET() {
  let streamNodes: Awaited<ReturnType<typeof fetchPlaylist>> = [];
  try {
    streamNodes = await fetchPlaylist();
  } catch {
    // Playlist failed; we will fall back to station.url for streamUrl below
  }

  let stations: Radiostation[];
  try {
    stations = await fetchRadiostations();
  } catch {
    stations = FALLBACK_STATIONS;
  }
  if (stations.length === 0) {
    return NextResponse.json(FALLBACK_STATIONS);
  }

  const streamTemplate = streamNodes[0] ?? null;

  const withStreams = stations.map((station, i) => {
    const streamUrl =
      streamTemplate != null
        ? buildStreamUrlForStation(station.url, streamTemplate)
        : undefined;
    return {
      ...station,
      streamUrl: streamUrl ?? station.url,
    };
  });

  return NextResponse.json(withStreams);
}
