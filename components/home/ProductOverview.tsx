import { PRODUCT_OVERVIEW } from "@/lib/constants";
import { Section } from "@/components/ui/Section";

export function ProductOverview() {
  return (
    <Section className="bg-surface/30">
      <h2 className="text-3xl font-bold text-headline mb-8">
        {PRODUCT_OVERVIEW.title}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h3 className="text-lg font-semibold text-headline mb-4">
            Core Features
          </h3>
          <ul className="space-y-3">
            {PRODUCT_OVERVIEW.coreFeatures.map((feature, i) => (
              <li
                key={i}
                className="flex gap-3 text-muted text-sm"
              >
                <span className="text-primary font-medium shrink-0">+</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-headline mb-2">
              User Experience
            </h3>
            <p className="text-muted text-sm">
              {PRODUCT_OVERVIEW.userExperience}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-headline mb-2">
              Technical Edge
            </h3>
            <p className="text-muted text-sm">
              {PRODUCT_OVERVIEW.technicalEdge}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
