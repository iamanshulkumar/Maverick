import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", asChild = false, loading, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          variant === "default" && "bg-foreground text-background hover:bg-foreground/90 active:bg-foreground/80",
          variant === "accent" && "bg-accent text-white hover:bg-accent-dark active:bg-accent-light shadow-glow",
          variant === "outline" && "border border-border bg-transparent hover:bg-surface-hover hover:text-foreground active:bg-surface-active",
          variant === "ghost" && "text-muted-foreground hover:bg-surface-hover hover:text-foreground active:bg-surface-active",
          size === "sm" && "h-8 px-3 text-sm rounded-md",
          size === "md" && "h-10 px-4 text-sm",
          size === "lg" && "h-12 px-6 text-base",
          loading && "cursor-wait",
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button };
