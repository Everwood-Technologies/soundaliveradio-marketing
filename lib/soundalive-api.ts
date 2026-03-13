import https from "node:https";

/**
 * Sound Alive Radio API (soundaliveradio.net).
 *
 * Order of operations:
 * 1. Playlist (playlist.json) - what live streams are available.
 *    Supports both:
 *    - { playList: [{ file: "https://.../live", ... }] }  (current upstream shape)
 *    - [{ host, port, path } | { url }]                    (legacy shape)
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
  title?: string;
  file?: string;
  djport?: string | number;
  type?: string;
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

interface PlaylistResponse {
  playList?: unknown;
  [key: string]: unknown;
}

const FETCH_TIMEOUT_MS = 10_000;
const PLAYLIST_TIMEOUT_MS = 10_000;
const CURRENT_TITLE_TIMEOUT_MS = 8_000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isSoundAliveHost(urlString: string): boolean {
  try {
    const host = new URL(urlString).hostname;
    return host === "soundaliveradio.net" || host.endsWith(".soundaliveradio.net");
  } catch {
    return false;
  }
}

function hasCertificateError(error: unknown): boolean {
  const isCertMessage = (value: unknown) =>
    typeof value === "string" &&
    /unable to verify the first certificate|UNABLE_TO_VERIFY_LEAF_SIGNATURE/i.test(
      value
    );

  if (!isRecord(error)) return false;
  if (isCertMessage(error.message) || isCertMessage(error.code)) return true;
  if (isRecord(error.cause)) {
    if (isCertMessage(error.cause.message) || isCertMessage(error.cause.code)) {
      return true;
    }
  }
  return false;
}

interface TextResponse {
  ok: boolean;
  status: number;
  text: string;
  contentType: string;
}

function getContentTypeHeader(
  headers: Record<string, string | string[] | undefined>
): string {
  const value = headers["content-type"];
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function insecureHttpsTextRequest(
  url: string,
  timeoutMs: number
): Promise<TextResponse> {
  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      {
        method: "GET",
        rejectUnauthorized: false,
        headers: SHARED_HEADERS as Record<string, string>,
      },
      (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => {
          const status = res.statusCode ?? 0;
          resolve({
            ok: status >= 200 && status < 300,
            status,
            text: body,
            contentType: getContentTypeHeader(res.headers),
          });
        });
      }
    );

    req.on("error", reject);
    req.setTimeout(timeoutMs, () => {
      req.destroy(new Error("Request timed out"));
    });
    req.end();
  });
}

async function fetchTextWithTlsFallback(
  url: string,
  timeoutMs: number,
  revalidate: number
): Promise<TextResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      next: { revalidate },
      signal: controller.signal,
      headers: SHARED_HEADERS,
    });
    clearTimeout(timeout);
    return {
      ok: res.ok,
      status: res.status,
      text: await res.text(),
      contentType: res.headers.get("content-type") ?? "",
    };
  } catch (error) {
    clearTimeout(timeout);
    if (!isSoundAliveHost(url) || !hasCertificateError(error)) {
      throw error;
    }
    // Some SoundAlive hosts have an incomplete TLS chain for Node's trust store.
    // Fall back to an explicit HTTPS request for these specific hosts only.
    return insecureHttpsTextRequest(url, timeoutMs);
  }
}

function parsePort(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const n = Number(value);
    if (Number.isFinite(n)) return n;
  }
  return undefined;
}

function toAbsoluteUrl(candidate: string, baseUrl?: string): string | undefined {
  const trimmed = candidate.trim();
  if (!trimmed) return undefined;
  try {
    return new URL(trimmed).href;
  } catch {
    if (!baseUrl) return undefined;
    try {
      const normalizedBase = baseUrl.replace(/\/$/, "");
      return new URL(trimmed, `${normalizedBase}/`).href;
    } catch {
      return undefined;
    }
  }
}

function toPlaylistNode(raw: unknown): PlaylistNode | null {
  if (!isRecord(raw)) return null;
  const node: PlaylistNode = { ...raw };

  if (typeof raw.title === "string") node.title = raw.title.trim();
  if (typeof raw.file === "string") node.file = raw.file.trim();
  if (typeof raw.url === "string") node.url = raw.url.trim();
  if (typeof raw.host === "string") node.host = raw.host.trim();
  if (typeof raw.path === "string") node.path = raw.path.trim();
  if (typeof raw.type === "string") node.type = raw.type.trim();
  if (typeof raw.djport === "string" || typeof raw.djport === "number") {
    node.djport = raw.djport;
  }

  const parsedPort = parsePort(raw.port);
  if (parsedPort != null) node.port = parsedPort;

  return node;
}

function normalizePlaylistPayload(payload: unknown): PlaylistNode[] {
  let candidates: unknown[] = [];

  if (Array.isArray(payload)) {
    candidates = payload;
  } else if (isRecord(payload) && Array.isArray((payload as PlaylistResponse).playList)) {
    candidates = (payload as PlaylistResponse).playList as unknown[];
  } else if (isRecord(payload)) {
    candidates = [payload];
  }

  return candidates
    .map(toPlaylistNode)
    .filter((node): node is PlaylistNode => node !== null);
}

function resolveStreamUrlFromNode(
  node: PlaylistNode,
  baseUrl?: string
): string | undefined {
  if (typeof node.file === "string") {
    const fromFile = toAbsoluteUrl(node.file, baseUrl);
    if (fromFile) return fromFile;
  }

  if (typeof node.url === "string") {
    const fromUrl = toAbsoluteUrl(node.url, baseUrl);
    if (fromUrl) return fromUrl;
  }

  const host = typeof node.host === "string" ? node.host.trim() : "";
  if (!host) return undefined;

  const port = parsePort(node.port);
  const path = typeof node.path === "string" ? node.path : "";
  const normalizedPath = path && !path.startsWith("/") ? `/${path}` : path;
  if (port != null) return `https://${host}:${port}${normalizedPath}`;
  return `https://${host}${normalizedPath}`;
}

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

export function extractStreamUrls(
  nodes: PlaylistNode[],
  baseUrl?: string
): string[] {
  const urls = nodes
    .map((node) => resolveStreamUrlFromNode(node, baseUrl))
    .filter((url): url is string => Boolean(url));
  return dedupeUrls(urls);
}

/**
 * Fetches and normalizes available live stream nodes.
 * GET {baseUrl}/playlist.json
 */
export async function fetchPlaylist(
  baseUrl = SOUNDALIVE_API_BASE
): Promise<PlaylistNode[]> {
  const base = baseUrl.replace(/\/$/, "");
  const response = await fetchTextWithTlsFallback(
    `${base}/playlist.json`,
    PLAYLIST_TIMEOUT_MS,
    60
  );
  if (!response.ok) {
    throw new Error(`playlist.json: ${response.status}`);
  }
  try {
    const data = JSON.parse(response.text);
    return normalizePlaylistPayload(data);
  } catch {
    throw new Error("playlist.json: invalid JSON response");
  }
}

/**
 * Fetch playlist candidates for a specific station base URL
 * and return normalized stream URLs.
 */
export async function fetchStationPlaylist(
  channelBaseUrl: string
): Promise<string[]> {
  const nodes = await fetchPlaylist(channelBaseUrl);
  return extractStreamUrls(nodes, channelBaseUrl);
}

/**
 * Fetches available channels and their stream URLs.
 * GET https://soundaliveradio.net/radiostations.json
 * Response: { stations: [{ name, url }, ...] }
 */
export async function fetchRadiostations(): Promise<Radiostation[]> {
  const response = await fetchTextWithTlsFallback(
    `${SOUNDALIVE_API_BASE}/radiostations.json`,
    FETCH_TIMEOUT_MS,
    60
  );
  if (!response.ok) {
    throw new Error(`radiostations.json: ${response.status}`);
  }
  try {
    const data: RadiostationsResponse = JSON.parse(response.text);
    const list = data?.stations;
    return Array.isArray(list) ? list : [];
  } catch {
    throw new Error("radiostations.json: invalid JSON response");
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
function normalizeCurrentTitlePayload(payload: unknown): string {
  if (typeof payload === "string") return payload.trim();
  if (isRecord(payload) && typeof payload.title === "string") {
    return payload.title.trim();
  }
  return "";
}

export async function fetchCurrentTitle(
  channelBaseUrl: string
): Promise<string> {
  const base = channelBaseUrl.replace(/\/$/, "");
  const url = `${base}/current-title`;
  const response = await fetchTextWithTlsFallback(
    url,
    CURRENT_TITLE_TIMEOUT_MS,
    15
  );
  if (!response.ok) return "";

  const trimmed = (response.text || "").trim();
  if (!trimmed) return "";

  if (response.contentType.includes("application/json")) {
    try {
      const data = JSON.parse(trimmed);
      return normalizeCurrentTitlePayload(data);
    } catch {
      return "";
    }
  }

  try {
    const parsed = JSON.parse(trimmed);
    const fromJson = normalizeCurrentTitlePayload(parsed);
    return fromJson || trimmed;
  } catch {
    return trimmed;
  }
}

/**
 * Build stream URL from a playlist node (main stream, no subdomain).
 */
export function buildStreamUrl(
  node: PlaylistNode,
  pathOrPort?: string | number
): string | undefined {
  if (typeof node.file === "string" && node.file) return node.file;
  if (typeof node.url === "string" && node.url) return node.url;
  const host = (node.host ?? "soundaliveradio.net") as string;
  const port = node.port ?? pathOrPort;
  const path =
    (node.path as string) ?? (typeof pathOrPort === "string" ? pathOrPort : "");
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

    const explicit = resolveStreamUrlFromNode(playlistNode);
    if (explicit) {
      const stream = new URL(explicit);
      const portPart = stream.port ? `:${stream.port}` : "";
      return `${protocol}//${hostname}${portPart}${stream.pathname || ""}${stream.search || ""}`;
    }

    const port = playlistNode.port ?? parsePort(playlistNode.djport);
    const path = (playlistNode.path as string) || "";
    if (port != null) return `${protocol}//${hostname}:${port}${path}`;
    return `${protocol}//${hostname}${path}`;
  } catch {
    return stationUrl;
  }
}
