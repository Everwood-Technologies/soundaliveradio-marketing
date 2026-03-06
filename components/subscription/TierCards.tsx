"use client";

import { SUBSCRIPTION } from "@/lib/constants";
import { MOCK_TIERS } from "@/lib/mock-data";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function TierCards() {
  const artistTiers = MOCK_TIERS.filter((t) => t.id.startsWith("artist-"));
  const allAccessTier = MOCK_TIERS.find((t) => t.id === "all-access");

  return (
    <Section>
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-headline mb-2">
          {SUBSCRIPTION.artistTiers}
        </h2>
        <p className="text-muted">
          Choose a tier. Your subscription goes on-chain to the artist.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {artistTiers.map((tier) => (
          <Card
            key={tier.id}
            className={cn(
              "p-6 flex flex-col",
              tier.highlighted && "border-primary/50 ring-1 ring-primary/20"
            )}
          >
            {tier.highlighted && (
              <span className="text-xs font-semibold text-primary mb-2">
                Popular
              </span>
            )}
            <h3 className="text-xl font-semibold text-headline mb-1">
              {tier.name}
            </h3>
            <p className="text-muted text-sm mb-4">{tier.description}</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl font-bold text-headline">
                {tier.price}
              </span>
              <span className="text-muted">{tier.currency}/mo</span>
            </div>
            <ul className="space-y-2 mb-6 flex-1">
              {tier.benefits.map((b) => (
                <li key={b} className="text-sm text-foreground flex items-center gap-2">
                  <span className="text-primary">+</span>
                  {b}
                </li>
              ))}
            </ul>
            <Button
              variant={tier.highlighted ? "primary" : "secondary"}
              size="md"
              asChild
            >
              <a href="#connect">{SUBSCRIPTION.selectTier}</a>
            </Button>
          </Card>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-headline mb-2">
          {SUBSCRIPTION.allAccess}
        </h2>
        <p className="text-muted">
          Support the whole platform. Access every channel and perk.
        </p>
      </div>
      {allAccessTier && (
        <Card className="p-6 md:p-8 max-w-2xl">
          <h3 className="text-xl font-semibold text-headline mb-1">
            {allAccessTier.name}
          </h3>
          <p className="text-muted text-sm mb-4">{allAccessTier.description}</p>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-3xl font-bold text-headline">
              {allAccessTier.price}
            </span>
            <span className="text-muted">{allAccessTier.currency}/mo</span>
          </div>
          <ul className="space-y-2 mb-6">
            {allAccessTier.benefits.map((b) => (
              <li key={b} className="text-sm text-foreground flex items-center gap-2">
                <span className="text-primary">+</span>
                {b}
              </li>
            ))}
          </ul>
          <Button variant="primary" size="lg" asChild>
            <a href="#connect">{SUBSCRIPTION.selectTier}</a>
          </Button>
        </Card>
      )}
    </Section>
  );
}
