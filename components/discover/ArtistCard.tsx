import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DISCOVER } from "@/lib/constants";

export interface ArtistCardProps {
  id: string;
  name: string;
  genre: string;
  bio: string;
  imageUrl?: string;
  channelHref: string;
}

export function ArtistCard({
  name,
  genre,
  bio,
  channelHref,
}: ArtistCardProps) {
  return (
    <Card className="p-0 overflow-hidden h-full flex flex-col">
      <div className="aspect-square bg-gradient-to-br from-primary/25 via-primary-dark/15 to-primary/10" />
      <div className="p-4 flex-1 flex flex-col">
        <Badge variant="genre" className="mb-2 w-fit">
          {genre}
        </Badge>
        <h3 className="font-semibold text-headline mb-1">{name}</h3>
        <p className="text-sm text-muted mb-4 line-clamp-2 flex-1">{bio}</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="primary" size="sm" asChild>
            <Link href={channelHref}>{DISCOVER.listenToChannel}</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/subscription">{DISCOVER.supportArtist}</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
