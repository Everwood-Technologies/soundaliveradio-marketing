"use client";

import dynamic from "next/dynamic";
import { type ReactNode } from "react";
import { PlayerProvider } from "@/context/PlayerContext";
import { WalletProvider } from "@/context/WalletContext";
import { WalletConnectorHost } from "@/components/wallet/WalletConnectorHost";

const MiniPlayer = dynamic(
  () => import("@/components/shared/MiniPlayer").then((mod) => mod.MiniPlayer),
  { ssr: false }
);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WalletProvider>
      <PlayerProvider>
        {children}
        <MiniPlayer />
        <WalletConnectorHost />
      </PlayerProvider>
    </WalletProvider>
  );
}
