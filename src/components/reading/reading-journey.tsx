"use client";

import { SectionTitle } from "@/components/shared/section-title";
import { Badge } from "@/components/ui/badge";
import type { ReadingJourneyPhase } from "@/types";

interface ReadingJourneyProps {
  journey: ReadingJourneyPhase[];
}

export function ReadingJourney({ journey }: ReadingJourneyProps) {
  return (
    <section id="journey" className="scroll-mt-24">
      <SectionTitle
        label="Evolution"
        title="The Reading Journey"
        description="How my taste has evolved over the years — from getting rich to understanding people."
      />

      <div className="relative mx-auto max-w-3xl">
        <div className="absolute left-0 right-0 top-6 h-px bg-border" aria-hidden="true" />

        <div className="grid gap-6 sm:grid-cols-3">
          {journey.map((phase) => (
            <div
              key={phase.years}
              className="relative flex flex-col items-center pt-14 text-center"
            >
              <div className="absolute top-5 h-3 w-3 rounded-full bg-accent ring-4 ring-background" />
              <span className="text-sm font-medium text-accent">{phase.years}</span>

              <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                {phase.focus.map((f) => (
                  <Badge key={f} variant="outline">
                    {f}
                  </Badge>
                ))}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {phase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
