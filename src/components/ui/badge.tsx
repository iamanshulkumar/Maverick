import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "outline";
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors",
          variant === "default" && "bg-muted text-muted-foreground",
          variant === "accent" && "bg-accent/10 text-accent-light",
          variant === "outline" && "border border-border text-muted-foreground",
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };
