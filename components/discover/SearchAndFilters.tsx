"use client";

import { DISCOVER } from "@/lib/constants";
import { cn } from "@/lib/utils";

const GENRES = ["All", "Hip-Hop", "House", "Rock", "Talk"] as const;

export function SearchAndFilters({
  search = "",
  genre = "All",
  onSearch,
  onGenreChange,
}: {
  search?: string;
  genre?: string;
  onSearch?: (q: string) => void;
  onGenreChange?: (genre: string) => void;
}) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value);
  };

  const handleGenre = (g: string) => {
    onGenreChange?.(g);
  };

  return (
    <div className="sticky top-[57px] z-40 glass border-b border-white/5 py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
        <input
          type="search"
          placeholder={DISCOVER.searchPlaceholder}
          value={search}
          onChange={handleSearch}
          className="w-full max-w-md px-4 py-2.5 rounded-xl bg-white/5 border border-border text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          aria-label="Search artists"
        />
        <div className="flex flex-wrap gap-2">
          {GENRES.map((g) => (
            <button
              type="button"
              key={g}
              onClick={() => handleGenre(g)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                genre === g
                  ? "bg-primary text-background"
                  : "bg-white/5 text-muted hover:text-foreground border border-border hover:border-white/10"
              )}
            >
              {g}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
