import Link from "next/link";
import { HERO, BRAND } from "@/lib/constants";
import { TrustBar } from "@/components/shared/TrustBar";
import { WaveformBg } from "@/components/shared/WaveformBg";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 pt-20 pb-16 overflow-hidden">
      <WaveformBg />
      <div className="relative z-10 max-w-4xl mx-auto">
        <p className="text-sm sm:text-base font-semibold text-primary uppercase tracking-wider mb-3">
          {BRAND.poweredBy}
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-headline mb-3">
          {HERO.headline}
        </h1>
        <p className="text-xl sm:text-2xl text-headline/90 font-medium mb-4">
          {HERO.tagline}
        </p>
        <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
          {HERO.subheadline}
        </p>
        <Button size="lg" variant="primary" asChild>
          <Link href="#listen" id="listen">
            {HERO.cta}
          </Link>
        </Button>
        <TrustBar className="mt-12" />
        <p className="mt-6 text-sm text-muted">
          {BRAND.pioneer}
        </p>
      </div>
    </section>
  );
}
