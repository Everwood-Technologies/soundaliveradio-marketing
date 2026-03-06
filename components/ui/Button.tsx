import { forwardRef, cloneElement, isValidElement, ReactElement } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white font-semibold border border-primary/50 glow-primary glow-primary-hover hover:bg-primary/90 hover:border-primary transition-colors",
  secondary:
    "bg-transparent text-primary border border-primary/60 hover:bg-primary/10 hover:border-primary transition-colors",
  ghost:
    "bg-transparent text-foreground border border-transparent hover:bg-white/5 hover:border-white/10 transition-colors",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-5 py-2.5 text-base rounded-xl",
  lg: "px-8 py-3.5 text-lg rounded-xl",
};

const buttonClass = (
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string
) =>
  cn(
    "inline-flex items-center justify-center font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", asChild = false, children, ...props },
    ref
  ) => {
    if (asChild && isValidElement(children)) {
      return cloneElement(children as ReactElement<{ className?: string }>, {
        className: cn(
          buttonClass(variant, size, className),
          (children as ReactElement<{ className?: string }>).props?.className
        ),
      });
    }
    return (
      <button
        ref={ref}
        className={buttonClass(variant, size, className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
