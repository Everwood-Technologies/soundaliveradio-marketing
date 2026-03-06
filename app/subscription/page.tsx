import { SubscriptionHero } from "@/components/subscription/SubscriptionHero";
import { TierCards } from "@/components/subscription/TierCards";
import { Testimonials } from "@/components/subscription/Testimonials";
import { ConnectWalletCTA } from "@/components/subscription/ConnectWalletCTA";

export default function SubscriptionPage() {
  return (
    <>
      <SubscriptionHero />
      <TierCards />
      <Testimonials />
      <ConnectWalletCTA />
    </>
  );
}
