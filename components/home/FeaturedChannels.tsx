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

export function FeaturedChannels() {
  const { channels, loading } = useLiveChannels();
  const displayChannels =
    channels.length > 0
      ? channels
      : MOCK_CHANNELS.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          genre: c.genre,
          nowPlaying: c.nowPlaying,
          listeners: c.listeners,
          coverUrl: c.coverUrl,
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayChannels.map((channel) => (
            <Card key={channel.id} className="p-0 overflow-hidden group">
              <Link href={`/channels#${channel.slug}`} className="block">
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
                <div className="p-4">
                  <Badge variant="live" className="mb-2">
                    Live
                  </Badge>
                  <h3 className="font-semibold text-headline mb-1">
                    {channel.name}
                  </h3>
                  <p className="text-xs text-muted mb-2">
                    {CHANNELS.nowPlaying}: {channel.nowPlaying}
                  </p>
                  <p className="text-xs text-muted mb-3">
                    {channel.listeners} listeners
                  </p>
                  <span className="text-sm font-medium text-primary">
                    {CHANNELS.tuneIn}
                  </span>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </Section>
  );
}
