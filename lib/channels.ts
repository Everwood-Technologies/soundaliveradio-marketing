import { CHANNEL_COVERS } from "@/app/assets/channels/channels";

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
  /** Stream candidates for failover */
  streamUrls: string[];
  /** Base URL for this channel (used to fetch current-title) */
  channelBaseUrl?: string;
}

type ChannelCoverSlug = keyof typeof CHANNEL_COVERS;

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

function mapGenre(name: string, explicitGenre?: string): string {
  if (explicitGenre) {
    const normalized = explicitGenre.trim().toLowerCase();
    if (normalized === "hip-hop" || normalized === "hiphop") return "Hip-Hop";
    if (normalized === "electronic" || normalized === "house") return "Electronic";
    if (normalized === "rock") return "Rock";
    if (normalized === "talk") return "Talk";
  }

  const lower = name.toLowerCase();
  if (lower.includes("house")) return "Electronic";
  if (lower.includes("rock")) return "Rock";
  if (lower.includes("talk")) return "Talk";
  return "Hip-Hop";
}

function dedupeUrls(urls: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const url of urls) {
    const trimmed = url.trim();
    if (!trimmed || seen.has(trimmed)) continue;
    seen.add(trimmed);
    result.push(trimmed);
  }
  return result;
}

function isLikelyStreamUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return false;
    // Station homepages often end with "/" and are not playable streams.
    return parsed.pathname !== "/";
  } catch {
    return false;
  }
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
  streamUrls?: string[];
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
  const genre = mapGenre(name, typeof station.genre === "string" ? station.genre : undefined);
  const streamUrls = Array.isArray(station.streamUrls)
    ? station.streamUrls.filter((u): u is string => typeof u === "string")
    : [];
  const normalizedStreamUrls = dedupeUrls(streamUrls).filter(isLikelyStreamUrl);
  const streamUrl =
    typeof station.streamUrl === "string"
      ? station.streamUrl
      : normalizedStreamUrls[0];
  const finalStreamUrls = dedupeUrls(
    streamUrl ? [streamUrl, ...normalizedStreamUrls] : normalizedStreamUrls
  ).filter(isLikelyStreamUrl);
  const channelBaseUrl =
    typeof station.url === "string" ? station.url.replace(/\/$/, "") : undefined;

  const canPlayPrimary =
    typeof streamUrl === "string" && streamUrl.startsWith("http");
  const safeStreamUrl = canPlayPrimary
    ? streamUrl
        : undefined;

  const coverSlug = coverSlugForName(name);
  const coverUrl =
    coverSlug && coverSlug in CHANNEL_COVERS
      ? CHANNEL_COVERS[coverSlug as ChannelCoverSlug].src
      : undefined;

  return {
    id,
    name,
    slug,
    genre,
    nowPlaying: nowPlaying || "—",
    listeners: "—",
    coverUrl,
    streamUrl: safeStreamUrl,
    streamUrls: finalStreamUrls,
    channelBaseUrl,
  };
}
