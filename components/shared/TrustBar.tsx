import { TRUST_BAR } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function TrustBar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-4 md:gap-8 py-4 text-sm text-muted",
        className
      )}
      role="list"
    >
      {TRUST_BAR.map((item, i) => (
        <span key={item} className="flex items-center gap-2" role="listitem">
          {i > 0 && (
            <span className="text-border select-none" aria-hidden>
              -
            </span>
          )}
          {item}
        </span>
      ))}
    </div>
  );
}
