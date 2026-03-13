import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Sound Alive Radio",
  description:
    "Learn about Sound Alive Radio, the world's first fully decentralized 24/7 radio network powered by Evernode DePIN on the XRP Ledger.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
