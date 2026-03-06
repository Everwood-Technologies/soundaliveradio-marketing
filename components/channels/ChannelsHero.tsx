import { CHANNELS } from "@/lib/constants";

export function ChannelsHero() {
  return (
    <section className="relative py-20 md:py-28 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-headline mb-4">
        {CHANNELS.heroTitle}
      </h1>
      <p className="text-lg text-muted max-w-2xl mx-auto">
        {CHANNELS.heroSub}
      </p>
    </section>
  );
}
