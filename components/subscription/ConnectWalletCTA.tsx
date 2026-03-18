"use client";

import { SUBSCRIPTION } from "@/lib/constants";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { useWallet } from "@/context/WalletContext";

function shortenAddress(address: string): string {
  return address.length <= 12 ? address : `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function ConnectWalletCTA() {
  const { status, account, error, clearError, connect, disconnect } = useWallet();
  const isConnected = status === "connected" && Boolean(account?.address);
  const isConnecting = status === "connecting";
  const accountLabel = account?.address ? shortenAddress(account.address) : null;

  return (
    <Section id="connect">
      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 md:p-12 text-center">
        <h2 className="text-2xl font-bold text-headline mb-2">
          Connect your wallet to subscribe
        </h2>
        <p className="text-muted mb-6 max-w-lg mx-auto">
          Upgrade to Premium or Pro for ad-free listening, badges, and exclusive
          NFT drops. Save 20% when you choose annual billing.
        </p>
        {isConnected && accountLabel ? (
          <p className="mb-4 text-sm text-primary">Connected as {accountLabel}</p>
        ) : null}
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          {isConnected ? (
            <Button variant="secondary" size="lg" onClick={() => void disconnect()}>
              Disconnect
            </Button>
          ) : (
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                if (error) clearError();
                void connect();
              }}
              disabled={isConnecting}
            >
              {isConnecting ? "Connecting..." : SUBSCRIPTION.connectWallet}
            </Button>
          )}
        </div>
        {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}
      </div>
    </Section>
  );
}
