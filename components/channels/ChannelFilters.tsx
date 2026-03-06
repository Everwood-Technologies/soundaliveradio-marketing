"use client";

import { cn } from "@/lib/utils";

const FILTERS = ["All", "Hip-Hop", "Electronic", "Rock", "Talk"] as const;

export function ChannelFilters({
  genre = "All",
  onFilter,
}: {
  genre?: string;
  onFilter?: (genre: string) => void;
}) {
  const handleClick = (g: string) => {
    onFilter?.(g);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {FILTERS.map((g) => (
        <button
          key={g}
          onClick={() => handleClick(g)}
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
  );
}
