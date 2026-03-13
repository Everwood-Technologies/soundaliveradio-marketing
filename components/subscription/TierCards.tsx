"use client";

import { useState } from "react";
import { SUBSCRIPTION } from "@/lib/constants";
import { MOCK_TIERS } from "@/lib/mock-data";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const ANNUAL_DISCOUNT = 0.2;
const MONTHS_IN_YEAR = 12;

function getAnnualPrice(monthlyPrice: number) {
  return monthlyPrice * MONTHS_IN_YEAR * (1 - ANNUAL_DISCOUNT);
}

function formatUsd(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function TierCards() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly"
  );

  return (
    <Section>
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-headline mb-2">
            {SUBSCRIPTION.artistTiers}
          </h2>
          <p className="text-muted">{SUBSCRIPTION.heroSub}</p>
        </div>
        <div>
          <div className="inline-flex rounded-full border border-border p-1">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                billingCycle === "monthly"
                  ? "bg-primary text-black"
                  : "text-muted hover:text-foreground"
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("annual")}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                billingCycle === "annual"
                  ? "bg-primary text-black"
                  : "text-muted hover:text-foreground"
              )}
            >
              Annual (20% off)
            </button>
          </div>
          <p className="text-xs text-muted mt-2 text-right">
            Save 20% when billed yearly.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_TIERS.map((tier) => {
          const monthlyPrice = Number(tier.price);
          const annualPrice = monthlyPrice === 0 ? 0 : getAnnualPrice(monthlyPrice);
          const billedPrice =
            billingCycle === "monthly" ? monthlyPrice : annualPrice;
          const annualSavings = monthlyPrice * MONTHS_IN_YEAR - annualPrice;
          const isFree = monthlyPrice === 0;

          return (
            <Card
              key={tier.id}
              className={cn(
                "p-6 flex flex-col",
                tier.highlighted && "border-primary/50 ring-1 ring-primary/20"
              )}
            >
              <div className="mb-6">
                <div className="mb-2 min-h-5">
                  {tier.highlighted ? (
                    <span className="text-xs font-semibold text-primary">
                      Popular
                    </span>
                  ) : (
                    <span aria-hidden className="invisible text-xs font-semibold">
                      Popular
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-headline">{tier.name}</h3>
                <p className="text-muted text-sm mt-2 min-h-12">{tier.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-headline">
                    {isFree ? "FREE" : formatUsd(billedPrice)}
                  </span>
                  <span className="text-muted">
                    {isFree ? "forever" : billingCycle === "monthly" ? "/month" : "/year"}
                  </span>
                </div>
                <p className="text-xs text-muted mt-1 min-h-4">
                  {isFree
                    ? "No billing required."
                    : billingCycle === "annual"
                      ? `${formatUsd(annualSavings)} off compared with monthly billing`
                      : "Billed monthly."}
                </p>
              </div>

              <ul className="space-y-2 mb-8 flex-1">
                {tier.benefits.map((b) => (
                  <li key={b} className="text-sm text-foreground flex items-start gap-2">
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
                <a href="#connect">{isFree ? "Start Free" : SUBSCRIPTION.selectTier}</a>
              </Button>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
