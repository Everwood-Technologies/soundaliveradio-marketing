import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discover Artists | Sound Alive Radio",
  description:
    "Discover the artists shaping the future. Stream their channels. Support them on-chain.",
};

export default function DiscoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
