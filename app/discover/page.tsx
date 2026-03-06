"use client";

import { useState } from "react";
import { DiscoverHero } from "@/components/discover/DiscoverHero";
import { SearchAndFilters } from "@/components/discover/SearchAndFilters";
import { ArtistGrid } from "@/components/discover/ArtistGrid";
import { SubmitMusicCTA } from "@/components/discover/SubmitMusicCTA";
import { Section } from "@/components/ui/Section";

export default function DiscoverPage() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");

  return (
    <>
      <DiscoverHero />
      <SearchAndFilters
        search={search}
        genre={genre}
        onSearch={setSearch}
        onGenreChange={setGenre}
      />
      <Section>
        <ArtistGrid search={search} genre={genre} />
      </Section>
      <SubmitMusicCTA />
    </>
  );
}
