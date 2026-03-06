import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Channels | Sound Alive Radio",
  description:
    "Live channels, always on, fully decentralized. Tune in to any channel. No sign-up required.",
};

export default function ChannelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
