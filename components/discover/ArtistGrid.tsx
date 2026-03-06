"use client";

import { useMemo } from "react";
import { MOCK_ARTISTS } from "@/lib/mock-data";
import { ArtistCard } from "./ArtistCard";

export function ArtistGrid({
  search = "",
  genre = "All",
}: {
  search?: string;
  genre?: string;
}) {
  const filtered = useMemo(() => {
    let list = MOCK_ARTISTS;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.genre.toLowerCase().includes(q) ||
          a.bio.toLowerCase().includes(q)
      );
    }
    if (genre !== "All") {
      list = list.filter((a) => a.genre === genre);
    }
    return list;
  }, [search, genre]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map((artist) => (
        <ArtistCard key={artist.id} {...artist} />
      ))}
      {filtered.length === 0 && (
        <div className="col-span-full text-center py-12 text-muted">
          No artists match your filters. Try a different search or genre.
        </div>
      )}
    </div>
  );
}
