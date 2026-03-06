"use client";

import { useState, useEffect, useCallback } from "react";
import type { LiveChannel } from "./channels";
import { toLiveChannel, type RadiostationRaw } from "./channels";

export interface UseLiveChannelsResult {
  channels: LiveChannel[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * ORDER OF OPERATIONS
 * 1. Fetch /api/radiostations -> server already did: playlist first, then radiostations (subdomains).
 * 2. For each channel, get "Now Playing" via /api/current-title only (proxy). Direct fetch to station URLs causes CORS.
 * 3. User clicks Tune In -> setChannel(streamUrl, name) -> MiniPlayer shows that stream and auto-plays.
 */
async function fetchCurrentTitleForChannel(baseUrl: string): Promise<string> {
  try {
    const res = await fetch(
      `/api/current-title?url=${encodeURIComponent(baseUrl.replace(/\/$/, ""))}`
    );
    if (!res.ok) return "";
    const { title } = await res.json();
    return typeof title === "string" ? title.trim() : "";
  } catch {
    return "";
  }
}

export function useLiveChannels(): UseLiveChannelsResult {
  const [channels, setChannels] = useState<LiveChannel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChannels = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/radiostations");
      if (!res.ok) throw new Error(`radiostations: ${res.status}`);
      const stations: RadiostationRaw[] = await res.json();
      if (!Array.isArray(stations) || stations.length === 0) {
        setChannels([]);
        return;
      }
      const withTitles = await Promise.all(
        stations.map(async (station) => {
          const channel = toLiveChannel(station);
          if (channel.channelBaseUrl) {
            const title = await fetchCurrentTitleForChannel(
              channel.channelBaseUrl
            );
            if (title) return { ...channel, nowPlaying: title };
          }
          return channel;
        })
      );
      setChannels(withTitles);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load channels");
      setChannels([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChannels();
  }, [fetchChannels]);

  return { channels, loading, error, refetch: fetchChannels };
}
