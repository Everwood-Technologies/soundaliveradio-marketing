"use client";

import Link from "next/link";
import Image from "next/image";
import { memo } from "react";
import { usePlayerActions } from "@/context/PlayerContext";
import { useWalletActions } from "@/context/WalletContext";
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
  streamUrls?: string[];
  channelBaseUrl?: string;
}

export const ChannelCard = memo(function ChannelCard({
  id,
  name,
  slug,
  genre,
  nowPlaying,
  listeners,
  coverUrl,
  streamUrl,
  streamUrls,
  channelBaseUrl,
}: ChannelCardProps) {
  const { setChannel } = usePlayerActions();
  const { ensureConnected } = useWalletActions();
  const hasPlayableStream =
    Boolean(streamUrl) || Boolean(streamUrls && streamUrls.length > 0);

  const handleTuneIn = async () => {
    const connected = await ensureConnected();
    if (!connected) return;

    setChannel({
      id,
      name,
      nowPlaying,
      channelBaseUrl,
      streamUrl,
      streamUrls,
    });
  };

  return (
    <Card className="group flex h-full flex-col overflow-hidden p-0">
      <Link href={`/channels#${slug}`} className="block flex flex-1 flex-col">
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
        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="live">Live</Badge>
            <Badge variant="genre">{genre}</Badge>
          </div>
          <h3 className="font-semibold text-headline mb-1 line-clamp-1">{name}</h3>
          <p className="text-xs text-muted mb-1 line-clamp-2 min-h-8">
            {CHANNELS.nowPlaying}: {nowPlaying}
          </p>
          <p className="text-xs text-muted mt-auto">{listeners} listeners</p>
        </div>
      </Link>
      <div className="px-4 pb-4 mt-auto">
        {hasPlayableStream ? (
          <button
            type="button"
            onClick={() => void handleTuneIn()}
            className="w-full inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-lg bg-primary text-background border border-primary/50 hover:bg-primary/90 transition-colors"
          >
            {CHANNELS.tuneIn}
          </button>
        ) : (
          <span className="w-full inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-lg bg-white/10 text-muted border border-white/10 cursor-not-allowed">
            {CHANNELS.tuneIn}
          </span>
        )}
      </div>
    </Card>
  );
});
