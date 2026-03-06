import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "elevated";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl border border-border transition-all duration-300 hover:border-white/15 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5",
          variant === "default" && "bg-surface",
          variant === "glass" && "glass",
          variant === "elevated" && "bg-surface-elevated border-white/10",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export { Card };
