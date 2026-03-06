import { MOCK_TESTIMONIALS } from "@/lib/mock-data";
import { Section } from "@/components/ui/Section";

export function Testimonials() {
  return (
    <Section className="bg-surface/50">
      <h2 className="text-2xl font-bold text-headline mb-8 text-center">
        What artists say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {MOCK_TESTIMONIALS.map(({ quote, author, role }) => (
          <blockquote
            key={author}
            className="p-6 rounded-2xl border border-border bg-surface"
          >
            <p className="text-foreground mb-4">&ldquo;{quote}&rdquo;</p>
            <footer>
              <cite className="not-italic font-semibold text-headline">
                {author}
              </cite>
              <span className="text-muted text-sm">, {role}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </Section>
  );
}
