"use client";

import { useMemo } from "react";
import { SectionTitle } from "@/components/shared/section-title";
import { Counter } from "@/components/reading/counter";
import type { Book } from "@/types";

interface ReadingStatsSectionProps {
  books: Book[];
}

export function ReadingStatsSection({ books }: ReadingStatsSectionProps) {
  const stats = useMemo(() => {
    const readBooks = books.filter((b) => b.status !== "Wishlist");
    const yearList = readBooks.filter((b) => b.yearRead > 0).map((b) => b.yearRead);
    const years = new Set(yearList);
    const genres = new Set(readBooks.map((b) => b.genre).filter(Boolean));
    const authors = new Set(readBooks.map((b) => b.author.trim()).filter(Boolean));

    const sortedYears = Array.from(years).sort((a, b) => a - b);
    let longestStreak = 0;
    if (sortedYears.length > 0) {
      let current = 1;
      for (let i = 1; i < sortedYears.length; i++) {
        if (sortedYears[i] === sortedYears[i - 1] + 1) {
          current += 1;
        } else {
          longestStreak = Math.max(longestStreak, current);
          current = 1;
        }
      }
      longestStreak = Math.max(longestStreak, current);
    }

    const genreCounts = new Map<string, number>();
    readBooks.forEach((b) => genreCounts.set(b.genre, (genreCounts.get(b.genre) ?? 0) + 1));
    const favoriteGenre = Array.from(genreCounts.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";

    const avgPerYear = yearList.length
      ? (readBooks.length / (Math.max(...yearList) - Math.min(...yearList) + 1)).toFixed(1)
      : "0";

    const byYear = readBooks.filter((b) => b.yearRead > 0).sort((a, b) => a.yearRead - b.yearRead);
    const newest = byYear[byYear.length - 1];
    const oldest = byYear[0];

    return {
      total: readBooks.length,
      yearsReading: years.size,
      genres: genres.size,
      authors: authors.size,
      longestStreak,
      avgPerYear,
      favoriteGenre,
      newest,
      oldest,
    };
  }, [books]);

  const cards = [
    { label: "Total Books", value: stats.total, isCounter: true },
    { label: "Active Years", value: stats.yearsReading, isCounter: true },
    { label: "Genres", value: stats.genres, isCounter: true },
    { label: "Authors", value: stats.authors, isCounter: true },
    { label: "Avg Books / Year", value: stats.avgPerYear, isCounter: false },
    { label: "Longest Streak", value: stats.longestStreak, isCounter: true, suffix: " yrs" },
  ];

  return (
    <section id="stats" className="scroll-mt-24">
      <SectionTitle
        label="By the Numbers"
        title="Reading Stats"
        description="Automatically generated from the library above."
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-border bg-card p-6 text-center"
          >
            <p className="text-3xl font-semibold tracking-tight">
              {card.isCounter ? (
                <Counter value={Number(card.value)} />
              ) : (
                <span>{card.value}</span>
              )}
              {card.suffix ?? ""}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-xs text-muted-foreground">Favorite Genre</p>
          <p className="mt-1 font-semibold">{stats.favoriteGenre}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-xs text-muted-foreground">Newest · Oldest</p>
          <p className="mt-1 text-sm">
            <span className="font-medium">{stats.newest?.title}</span>{" "}
            <span className="text-muted-foreground">({stats.newest?.yearRead})</span>
            {" → "}
            <span className="font-medium">{stats.oldest?.title}</span>{" "}
            <span className="text-muted-foreground">({stats.oldest?.yearRead})</span>
          </p>
        </div>
      </div>
    </section>
  );
}
