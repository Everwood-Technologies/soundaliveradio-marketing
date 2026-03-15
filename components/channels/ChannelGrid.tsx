"use client";

import { useMemo } from "react";
import { MOCK_CHANNELS } from "@/lib/mock-data";
import { useLiveChannels } from "@/lib/useLiveChannels";
import { ChannelCard } from "./ChannelCard";

export function ChannelGrid({ genre = "All" }: { genre?: string }) {
  const { channels, loading } = useLiveChannels();
  const source = useMemo(
    () =>
      channels.length > 0
        ? channels.map((c) => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
            genre: c.genre,
            nowPlaying: c.nowPlaying,
            listeners: c.listeners,
            coverUrl: c.coverUrl,
            streamUrl: c.streamUrl,
            streamUrls: c.streamUrls,
            channelBaseUrl: c.channelBaseUrl,
          }))
        : MOCK_CHANNELS,
    [channels]
  );
  const filtered = useMemo(() => {
    if (genre === "All") return source;
    return source.filter((c) => c.genre === genre);
  }, [genre, source]);

  if (loading && channels.length === 0) {
    return <p className="text-muted col-span-full">Loading channels...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
      {filtered.map((channel) => (
        <ChannelCard key={channel.id} {...channel} />
      ))}
    </div>
  );
}
