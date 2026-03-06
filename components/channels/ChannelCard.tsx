"use client";

import Link from "next/link";
import Image from "next/image";
import { usePlayer } from "@/context/PlayerContext";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CHANNELS } from "@/lib/constants";

export interface ChannelCardProps {
  id: string;
  name: string;
  slug: string;
  genre: string;
  nowPlaying: string;
  listeners: string;
  coverUrl?: string;
  streamUrl?: string;
}

export function ChannelCard({
  name,
  slug,
  genre,
  nowPlaying,
  listeners,
  coverUrl,
  streamUrl,
}: ChannelCardProps) {
  const { setChannel } = usePlayer();

  return (
    <Card className="p-0 overflow-hidden group">
      <Link href={`/channels#${slug}`} className="block">
        <div className="relative aspect-square bg-gradient-to-br from-primary/25 via-primary-dark/15 to-primary/10 group-hover:opacity-90 transition-opacity">
          {coverUrl && (
            <Image
              src={coverUrl}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="live">Live</Badge>
            <Badge variant="genre">{genre}</Badge>
          </div>
          <h3 className="font-semibold text-headline mb-1">{name}</h3>
          <p className="text-xs text-muted mb-1">
            {CHANNELS.nowPlaying}: {nowPlaying}
          </p>
          <p className="text-xs text-muted mb-3">{listeners} listeners</p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        {streamUrl ? (
          <button
            type="button"
            onClick={() => setChannel(streamUrl, name)}
            className="w-full inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-lg bg-primary text-background border border-primary/50 hover:bg-primary/90 transition-colors"
          >
            {CHANNELS.tuneIn}
          </button>
        ) : (
          <span className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-lg bg-white/10 text-muted border border-white/10 cursor-not-allowed">
            {CHANNELS.tuneIn}
          </span>
        )}
      </div>
    </Card>
  );
}
