import { SUBSCRIPTION } from "@/lib/constants";

export function SubscriptionHero() {
  return (
    <section className="relative py-20 md:py-28 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-headline mb-4">
        {SUBSCRIPTION.heroTitle}
      </h1>
      <p className="text-lg text-muted max-w-2xl mx-auto">
        {SUBSCRIPTION.heroSub}
      </p>
    </section>
  );
}
