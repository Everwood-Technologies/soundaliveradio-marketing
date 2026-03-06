import { DISCOVER } from "@/lib/constants";

export function DiscoverHero() {
  return (
    <section className="relative py-20 md:py-28 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-headline mb-4">
        {DISCOVER.heroTitle}
      </h1>
      <p className="text-lg text-muted max-w-2xl mx-auto">
        {DISCOVER.heroSub}
      </p>
    </section>
  );
}
