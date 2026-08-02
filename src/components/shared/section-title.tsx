"use client";

interface SectionTitleProps {
  label: string;
  title: string;
  description?: string;
}

export function SectionTitle({ label, title, description }: SectionTitleProps) {
  return (
    <div className="mb-8 md:mb-12 text-center">
      <span className="mb-4 inline-block text-xs font-medium uppercase tracking-widest text-accent">
        {label}
      </span>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-3 text-base text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
