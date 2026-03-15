"use client";

import { useDeferredValue, useState } from "react";
import { SearchAndFilters } from "@/components/discover/SearchAndFilters";
import { ArtistGrid } from "@/components/discover/ArtistGrid";
import { Section } from "@/components/ui/Section";

export function DiscoverContent() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const deferredSearch = useDeferredValue(search);

  return (
    <>
      <SearchAndFilters
        search={search}
        genre={genre}
        onSearch={setSearch}
        onGenreChange={setGenre}
      />
      <Section>
        <ArtistGrid search={deferredSearch} genre={genre} />
      </Section>
    </>
  );
}
