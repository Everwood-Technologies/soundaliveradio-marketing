"use client";

import Link from "next/link";
import Image from "next/image";
import { MOCK_CHANNELS } from "@/lib/mock-data";
import { useLiveChannels } from "@/lib/useLiveChannels";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CHANNELS } from "@/lib/constants";
import { usePlayer } from "@/context/PlayerContext";

export function FeaturedChannels() {
  const { setChannel } = usePlayer();
  const { channels, loading } = useLiveChannels();
  const displayChannels =
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
      : MOCK_CHANNELS.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          genre: c.genre,
          nowPlaying: c.nowPlaying,
          listeners: c.listeners,
          coverUrl: c.coverUrl,
          streamUrl: undefined,
          streamUrls: [] as string[],
          channelBaseUrl: undefined,
        }));

  return (
    <Section>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <h2 className="text-3xl font-bold text-headline">
          Live Channels - Always On
        </h2>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/channels">View all channels</Link>
        </Button>
      </div>
      <p className="text-muted mb-10 max-w-2xl">
        Hip-Hop, House, Rock, Talk — always on. Pick a channel below or explore{" "}
        <Link href="/discover" className="text-primary hover:underline">
          Discover
        </Link>
        .
      </p>
      {loading && displayChannels.length === 0 ? (
        <p className="text-muted">Loading channels...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {displayChannels.map((channel) => (
            <Card
              key={channel.id}
              className="group flex h-full flex-col overflow-hidden p-0"
            >
              <Link
                href={`/channels#${channel.slug}`}
                className="block flex flex-1 flex-col"
              >
                <div className="relative aspect-square bg-gradient-to-br from-primary/25 via-primary-dark/15 to-primary/10 group-hover:opacity-90 transition-opacity">
                  {channel.coverUrl && (
                    <Image
                      src={channel.coverUrl}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <Badge variant="live" className="mb-2">
                    Live
                  </Badge>
                  <h3 className="font-semibold text-headline mb-1 line-clamp-1">
                    {channel.name}
                  </h3>
                  <p className="text-xs text-muted mb-2 line-clamp-2 min-h-8">
                    {CHANNELS.nowPlaying}: {channel.nowPlaying}
                  </p>
                  <p className="text-xs text-muted mt-auto">
                    {channel.listeners} listeners
                  </p>
                </div>
              </Link>
              <div className="px-4 pb-4 mt-auto">
                {channel.streamUrl || channel.streamUrls.length > 0 ? (
                  <button
                    type="button"
                    onClick={() =>
                      setChannel({
                        id: channel.id,
                        name: channel.name,
                        nowPlaying: channel.nowPlaying,
                        channelBaseUrl: channel.channelBaseUrl,
                        streamUrl: channel.streamUrl,
                        streamUrls: channel.streamUrls,
                      })
                    }
                    className="w-full inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-lg bg-primary text-background border border-primary/50 hover:bg-primary/90 transition-colors"
                  >
                    {CHANNELS.tuneIn}
                  </button>
                ) : (
                  <span className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-lg bg-white/10 text-muted border border-white/10 cursor-not-allowed w-full">
                    {CHANNELS.tuneIn}
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </Section>
  );
}
