import Link from "next/link";
import { DISCOVER } from "@/lib/constants";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export function SubmitMusicCTA() {
  return (
    <Section className="bg-surface/50">
      <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 md:p-12 text-center">
        <h2 className="text-2xl font-bold text-headline mb-2">
          {DISCOVER.submitCta}
        </h2>
        <Button variant="primary" size="lg" asChild className="mt-4">
          <Link href="/submit-music">Submit your music</Link>
        </Button>
      </div>
    </Section>
  );
}
