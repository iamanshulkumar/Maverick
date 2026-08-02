"use client";

import { BookOpen } from "lucide-react";
import { SectionTitle } from "@/components/shared/section-title";
import type { ReadingInsight } from "@/types";

interface ReadingInsightsProps {
  insights: ReadingInsight[];
}

export function ReadingInsights({ insights }: ReadingInsightsProps) {
  return (
    <section id="insights" className="scroll-mt-24">
      <SectionTitle
        label="Insights"
        title="Books That Changed How I Think"
        description="Not every book is a page-turner. Some of them quietly rewire you."
      />

      <div className="grid gap-3 md:grid-cols-3">
        {insights.map((insight) => (
          <div
            key={insight.book}
            className="flex flex-col rounded-xl border border-border bg-card p-6"
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent/10 text-accent">
                <BookOpen className="h-4 w-4" />
              </span>
              <h3 className="font-semibold">{insight.book}</h3>
            </div>

            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-accent-light">Why it mattered · </span>
              {insight.why}
            </p>

            <p className="mt-3 line-clamp-5 text-sm leading-relaxed text-muted-foreground">
              <span className="font-medium text-accent-light">How it changed me · </span>
              {insight.impact}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
