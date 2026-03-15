"use client";

import { memo, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MOCK_ARTISTS } from "@/lib/mock-data";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DISCOVER } from "@/lib/constants";

const CARD_WIDTH = 320;
const GAP = 24;
const SCROLL_STEP = CARD_WIDTH + GAP;
const MAX_INDEX = Math.max(0, MOCK_ARTISTS.length - 3);

type SpotlightArtist = (typeof MOCK_ARTISTS)[number];

const ArtistSpotlightCard = memo(function ArtistSpotlightCard({
  artist,
}: {
  artist: SpotlightArtist;
}) {
  return (
    <motion.div
      className="flex-shrink-0 w-[280px] sm:w-[320px] snap-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Card className="p-0 overflow-hidden h-full flex flex-col">
        <div className="relative aspect-square bg-gradient-to-br from-primary/25 via-primary-dark/15 to-primary/10">
          {artist.imageUrl && (
            <Image
              src={artist.imageUrl}
              alt={`${artist.name} artwork`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <Badge variant="genre" className="mb-2 w-fit">
            {artist.genre}
          </Badge>
          <h3 className="font-semibold text-headline mb-1">{artist.name}</h3>
          <p className="text-sm text-muted mb-4 line-clamp-2 flex-1">{artist.bio}</p>
          <div className="flex gap-2">
            <Button variant="primary" size="sm" asChild>
              <Link href={artist.channelHref}>Listen to their channel</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/subscription">{DISCOVER.supportArtist}</Link>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
});

export function ArtistSpotlightCarousel() {
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let frameId: number | null = null;

    const updateIndex = () => {
      frameId = null;
      const nextIndex = Math.min(Math.round(el.scrollLeft / SCROLL_STEP), MAX_INDEX);
      setIndex((currentIndex) => (currentIndex === nextIndex ? currentIndex : nextIndex));
    };

    const onScroll = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateIndex);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <Section className="bg-surface/50">
      <h2 className="text-3xl font-bold text-headline mb-2">
        Artists Shaping the Future
      </h2>
      <p className="text-muted mb-8 max-w-2xl">
        Stream their channels. Support them on-chain.
      </p>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4 -mx-4 px-4 md:mx-0 md:px-0"
        >
          {MOCK_ARTISTS.map((artist) => (
            <ArtistSpotlightCard key={artist.id} artist={artist} />
          ))}
        </div>
        {MAX_INDEX > 0 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: MAX_INDEX + 1 }).map((_, i) => (
              <button
                type="button"
                key={i}
                onClick={() => {
                  scrollRef.current?.scrollTo({
                    left: i * SCROLL_STEP,
                    behavior: "smooth",
                  });
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === index ? "bg-primary" : "bg-border"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="mt-8 text-center">
        <Button variant="secondary" asChild>
          <Link href="/discover">Discover all artists</Link>
        </Button>
      </div>
    </Section>
  );
}
