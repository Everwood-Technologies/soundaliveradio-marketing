"use client";

import dynamic from "next/dynamic";
import { type ReactNode } from "react";
import { PlayerProvider } from "@/context/PlayerContext";

const MiniPlayer = dynamic(
  () => import("@/components/shared/MiniPlayer").then((mod) => mod.MiniPlayer),
  { ssr: false }
);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <PlayerProvider>
      {children}
      <MiniPlayer />
    </PlayerProvider>
  );
}
