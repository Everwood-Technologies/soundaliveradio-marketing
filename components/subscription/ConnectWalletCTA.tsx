import { SUBSCRIPTION } from "@/lib/constants";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export function ConnectWalletCTA() {
  return (
    <Section id="connect">
      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 md:p-12 text-center">
        <h2 className="text-2xl font-bold text-headline mb-2">
          Connect your wallet to subscribe
        </h2>
        <p className="text-muted mb-6 max-w-lg mx-auto">
          Your subscription goes straight to the artists you love. No labels.
          No platforms taking 50%. Pay monthly on XRPL/Xahau.
        </p>
        <Button variant="primary" size="lg" asChild>
          <a href="#">{SUBSCRIPTION.connectWallet}</a>
        </Button>
      </div>
    </Section>
  );
}
