import { cn } from "@/lib/utils";

interface TechBadgeProps {
  name: string;
  variant?: "default" | "accent" | "outline";
  className?: string;
}

export function TechBadge({ name, variant = "default", className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
        variant === "default" && "bg-muted text-muted-foreground",
        variant === "accent" && "bg-accent/10 text-accent-light",
        variant === "outline" && "border border-border text-muted-foreground",
        className
      )}
    >
      {name}
    </span>
  );
}
