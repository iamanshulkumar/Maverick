import { PropsWithChildren } from "react";

interface AnimatedSectionProps extends PropsWithChildren {
  className?: string;
  delay?: number;
}

export function AnimatedSection({ children, className }: AnimatedSectionProps) {
  return <section className={className}>{children}</section>;
}
