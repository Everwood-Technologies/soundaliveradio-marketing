import { STATS } from "@/lib/constants";
import { Section } from "@/components/ui/Section";

export function StatsBar() {
  return (
    <Section className="py-12 md:py-16 border-y border-border">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {STATS.map(({ value, label }) => (
          <div key={label}>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
              {value}
            </div>
            <div className="text-sm text-muted">{label}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
