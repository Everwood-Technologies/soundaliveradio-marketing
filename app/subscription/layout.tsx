import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscription | Sound Alive Radio",
  description:
    "Choose Free, Premium, or Pro. Save 20% with annual billing and unlock ad-free listening, badges, and exclusive NFT drops.",
};

export default function SubscriptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
