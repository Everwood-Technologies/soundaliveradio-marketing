"use client";

import { type ReactNode } from "react";
import { PlayerProvider } from "@/context/PlayerContext";
import { MiniPlayer } from "@/components/shared/MiniPlayer";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <PlayerProvider>
      {children}
      <MiniPlayer />
    </PlayerProvider>
  );
}
