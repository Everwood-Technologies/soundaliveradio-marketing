/**
 * Normalized channel shape for UI (ChannelCard, grids).
 * Built from Sound Alive API (radiostations + current-title) with fallbacks.
 */

export interface LiveChannel {
  id: string;
  name: string;
  slug: string;
  genre: string;
  nowPlaying: string;
  listeners: string;
  coverUrl?: string;
  /** Stream URL for the mini player */
  streamUrl?: string;
  /** Base URL for this channel (used to fetch current-title) */
  channelBaseUrl?: string;
}

const KNOWN_SLUG_COVERS: Record<string, string> = {
  hiphop: "/channels/hiphop.png",
  house: "/channels/house.png",
  rock: "/channels/rock.png",
  talk: "/channels/talk.png",
};

/** Map API station name to cover image slug (we have hiphop, house, rock, talk). */
function coverSlugForName(name: string): string | undefined {
  const lower = name.toLowerCase();
  if (lower.includes("house")) return "house";
  if (lower.includes("rock")) return "rock";
  if (lower.includes("talk")) return "talk";
  if (lower.includes("sound alive radio") && !lower.includes("rock") && !lower.includes("talk") && !lower.includes("house"))
    return "hiphop";
  return undefined;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export interface RadiostationRaw {
  id?: string;
  name?: string;
  url?: string;
  streamUrl?: string;
  genre?: string;
  [key: string]: unknown;
}

/**
 * Maps API radiostation + optional nowPlaying to LiveChannel.
 */
export function toLiveChannel(
  station: RadiostationRaw,
  nowPlaying = ""
): LiveChannel {
  const name = (station.name ?? station.id ?? "Channel").toString();
  const slug = slugify(name);
  const id = (station.id ?? slug).toString();
  const genre = (station.genre ?? "Live").toString();
  const streamUrl =
    typeof station.streamUrl === "string"
      ? station.streamUrl
      : typeof station.url === "string"
        ? station.url
        : undefined;
  const channelBaseUrl =
    typeof station.url === "string"
      ? station.url.replace(/\/$/, "")
      : undefined;

  const coverSlug = coverSlugForName(name);
  const coverUrl = coverSlug ? KNOWN_SLUG_COVERS[coverSlug] : undefined;

  return {
    id,
    name,
    slug,
    genre,
    nowPlaying: nowPlaying || "—",
    listeners: "—",
    coverUrl,
    streamUrl,
    channelBaseUrl,
  };
}
