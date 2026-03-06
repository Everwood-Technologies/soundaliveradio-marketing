import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscription | Sound Alive Radio",
  description:
    "Support artists directly. Monthly on-chain subscriptions. No labels. No platforms taking 50%.",
};

export default function SubscriptionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
