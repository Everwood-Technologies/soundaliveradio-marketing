/**
 * Sound Alive Radio API (soundaliveradio.net).
 *
 * Order of operations:
 * 1. Playlist (playlist.json) - what live streams are available (host/port/path or URL).
 * 2. Radiostations (radiostations.json) - genre-specific subdomains:
 *    hiphop = no subdomain (main), rock = rock.<livestreamurl>, house = house.<livestreamurl>, talk = talk.<livestreamurl>.
 * 3. Current-title - GET {stationBaseUrl}/current-title on each subdomain for "Now Playing".
 */

export const SOUNDALIVE_API_BASE = "https://soundaliveradio.net";

/** Request like a normal client so the host doesn't block or mishandle Node fetch */
const SHARED_HEADERS: HeadersInit = {
  "User-Agent":
    "Mozilla/5.0 (compatible; SoundAliveRadio/1.0; +https://soundaliveradio.net)",
  Accept: "application/json, text/plain, */*",
};

/** Live stream node from playlist.json - defines available stream(s) to connect to */
export interface PlaylistNode {
  host?: string;
  port?: number;
  path?: string;
  url?: string;
  [key: string]: unknown;
}

/** Channel/station from radiostations.json */
export interface Radiostation {
  name: string;
  url: string;
}

/** Response shape of radiostations.json */
export interface RadiostationsResponse {
  stations: Radiostation[];
}

/**
 * Fetches available live stream nodes (host/port or URLs).
 * GET https://soundaliveradio.net/playlist.json
 */
export async function fetchPlaylist(): Promise<PlaylistNode[]> {
  const res = await fetch(`${SOUNDALIVE_API_BASE}/playlist.json`, {
    next: { revalidate: 60 },
    headers: SHARED_HEADERS,
  });
  if (!res.ok) throw new Error(`playlist.json: ${res.status}`);
  const data = await res.json();
  return Array.isArray(data) ? data : [data];
}

const FETCH_TIMEOUT_MS = 10_000;

/**
 * Fetches available channels and their stream URLs.
 * GET https://soundaliveradio.net/radiostations.json
 * Response: { stations: [{ name, url }, ...] }
 */
export async function fetchRadiostations(): Promise<Radiostation[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(`${SOUNDALIVE_API_BASE}/radiostations.json`, {
      next: { revalidate: 60 },
      signal: controller.signal,
      headers: SHARED_HEADERS,
    });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`radiostations.json: ${res.status}`);
    const data: RadiostationsResponse = await res.json();
    const list = data?.stations;
    return Array.isArray(list) ? list : [];
  } catch (e) {
    clearTimeout(timeout);
    throw e;
  }
}

/**
 * Fetches the current track title for a channel.
 * GET {channelBaseUrl}/current-title
 *
 * 502 happened because this fetch runs on the server. The server's request to
 * soundaliveradio.net (or rock./talk./house. subdomains) can fail due to:
 * - Timeout (remote host slow or not responding)
 * - Connection refused / not reachable from server network (e.g. Vercel, local)
 * - DNS resolution different from your browser (e.g. subdomains only in CDN)
 * - TLS or firewall blocking server IPs
 * When it throws, the API route now returns 200 with empty title instead of 502.
 */
const CURRENT_TITLE_TIMEOUT_MS = 8_000;

export async function fetchCurrentTitle(
  channelBaseUrl: string
): Promise<string> {
  const base = channelBaseUrl.replace(/\/$/, "");
  const url = `${base}/current-title`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CURRENT_TITLE_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      next: { revalidate: 15 },
      signal: controller.signal,
      headers: SHARED_HEADERS,
    });
    clearTimeout(timeout);
    if (!res.ok) return "";
    const text = await res.text();
    return (text || "").trim();
  } catch (e) {
    clearTimeout(timeout);
    throw e;
  }
}

/**
 * Build stream URL from a playlist node (main stream, no subdomain).
 */
export function buildStreamUrl(
  node: PlaylistNode,
  pathOrPort?: string | number
): string | undefined {
  if (typeof node.url === "string" && node.url) return node.url;
  const host = (node.host ?? "soundaliveradio.net") as string;
  const port = node.port ?? pathOrPort;
  const path = (node.path as string) ?? (typeof pathOrPort === "string" ? pathOrPort : "");
  if (port != null) return `https://${host}:${port}${path}`;
  return `https://${host}${path}`;
}

/**
 * Build stream URL for a station using the playlist stream template.
 * Radiostations use subdomains: hiphop = main, rock = rock.<host>, house = house.<host>, talk = talk.<host>.
 * Station URL is e.g. https://rock.soundaliveradio.net/ so we use that host + playlist port/path.
 */
export function buildStreamUrlForStation(
  stationUrl: string,
  playlistNode: PlaylistNode
): string {
  try {
    const stationOrigin = new URL(stationUrl);
    const hostname = stationOrigin.hostname;
    const protocol = stationOrigin.protocol;

    if (typeof playlistNode.url === "string" && playlistNode.url) {
      const stream = new URL(playlistNode.url);
      const portPart = stream.port ? `:${stream.port}` : "";
      return `${protocol}//${hostname}${portPart}${stream.pathname || ""}`;
    }

    const port = playlistNode.port;
    const path = (playlistNode.path as string) || "";
    if (port != null) return `${protocol}//${hostname}:${port}${path}`;
    return `${protocol}//${hostname}${path}`;
  } catch {
    return stationUrl;
  }
}
