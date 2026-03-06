import { cn } from "@/lib/utils";

export type BadgeVariant = "live" | "onchain" | "genre" | "evernode" | "default";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  live: "bg-primary/20 text-primary border-primary/40",
  onchain: "bg-accent-purple/20 text-accent-purple border-accent-purple/40",
  genre: "bg-white/10 text-muted border-white/10",
  evernode: "bg-accent-blue/20 text-accent-blue border-accent-blue/40",
  default: "bg-white/5 text-foreground border-border",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}
