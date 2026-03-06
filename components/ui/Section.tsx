import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div";
  containerClassName?: string;
}

export function Section({
  className,
  containerClassName,
  as: Component = "section",
  children,
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn("py-16 md:py-24", className)}
      {...props}
    >
      <div
        className={cn(
          "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
          containerClassName
        )}
      >
        {children}
      </div>
    </Component>
  );
}
