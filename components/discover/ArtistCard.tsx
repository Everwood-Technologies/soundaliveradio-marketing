import Link from "next/link";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { memo } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DISCOVER } from "@/lib/constants";

export interface ArtistCardProps {
  id: string;
  name: string;
  genre: string;
  bio: string;
  imageUrl?: string | StaticImageData;
  channelHref: string;
}

export const ArtistCard = memo(function ArtistCard({
  name,
  genre,
  bio,
  imageUrl,
  channelHref,
}: ArtistCardProps) {
  const isExternalChannel = /^https?:\/\//.test(channelHref);

  return (
    <Card className="p-0 overflow-hidden h-full flex flex-col">
      <div className="relative aspect-square bg-gradient-to-br from-primary/25 via-primary-dark/15 to-primary/10">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={`${name} artwork`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <Badge variant="genre" className="mb-2 w-fit">
          {genre}
        </Badge>
        <h3 className="font-semibold text-headline mb-1">{name}</h3>
        <p className="text-sm text-muted mb-4 line-clamp-2 flex-1">{bio}</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="primary" size="sm" asChild>
            <Link
              href={channelHref}
              target={isExternalChannel ? "_blank" : undefined}
              rel={isExternalChannel ? "noopener noreferrer" : undefined}
            >
              {DISCOVER.listenToChannel}
            </Link>
          </Button>
          {/* <Button variant="ghost" size="sm" asChild>
            <Link href="/subscription">{DISCOVER.supportArtist}</Link>
          </Button> */}
        </div>
      </div>
    </Card>
  );
});
