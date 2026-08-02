"use client";

import { useMemo } from "react";
import { SectionTitle } from "@/components/shared/section-title";
import type { Book } from "@/types";

interface ReadingHeatmapProps {
  books: Book[];
}

const intensityColors = [
  "bg-card border border-border",
  "bg-accent/20",
  "bg-accent/40",
  "bg-accent/60",
  "bg-accent",
];

export function ReadingHeatmap({ books }: ReadingHeatmapProps) {
  const years = useMemo(() => {
    const map = new Map<number, number>();
    let min = Infinity;
    let max = -Infinity;
    books.forEach((b) => {
      if (b.yearRead <= 0) return;
      map.set(b.yearRead, (map.get(b.yearRead) ?? 0) + 1);
      min = Math.min(min, b.yearRead);
      max = Math.max(max, b.yearRead);
    });
    if (min === Infinity) return [];
    const result: { year: number; count: number }[] = [];
    for (let y = min; y <= max; y++) {
      result.push({ year: y, count: map.get(y) ?? 0 });
    }
    return result;
  }, [books]);

  const maxCount = Math.max(...years.map((y) => y.count), 1);

  return (
    <section id="heatmap" className="scroll-mt-24">
      <SectionTitle
        label="Activity"
        title="Reading Heatmap"
        description="One cell per year. The brighter the cell, the more books I read that year."
      />

      <div className="mx-auto max-w-3xl rounded-xl border border-border bg-card p-6">
        <div className="flex flex-wrap items-end justify-center gap-2">
          {years.map(({ year, count }) => {
            const level = count === 0 ? 0 : 1 + Math.floor(((count - 1) / maxCount) * 3);
            return (
              <div
                key={year}
                className="group relative flex flex-col items-center"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg text-sm font-medium transition-transform group-hover:scale-110 sm:h-14 sm:w-14 ${
                    count > 0 ? "text-white" : "text-muted-foreground"
                  } ${intensityColors[level]}`}
                  aria-label={`${year}: ${count} ${count === 1 ? "book" : "books"}`}
                >
                  {count > 0 ? count : "·"}
                </div>
                <span className="mt-2 text-[10px] text-muted-foreground">{year}</span>
                <div
                  role="tooltip"
                  className="pointer-events-none absolute -top-9 z-10 whitespace-nowrap rounded-md border border-border bg-card px-2 py-1 text-xs text-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100"
                >
                  {count === 0 ? "No books" : `${count} ${count === 1 ? "book" : "books"}`}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <span>Less</span>
          {intensityColors.map((c, i) => (
            <div key={i} className={`h-3 w-3 rounded-sm ${c}`} />
          ))}
          <span>More</span>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-3xl text-center text-sm text-muted-foreground">
        Most productive year:{" "}
        <span className="font-medium text-foreground">
          {years.reduce((a, b) => (b.count > a.count ? b : a)).year}
        </span>{" "}
        with{" "}
        <span className="font-medium text-foreground">
          {maxCount} {maxCount === 1 ? "book" : "books"}
        </span>
        .
      </div>
    </section>
  );
}
