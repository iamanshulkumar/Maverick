"use client";

import { ReadingHero } from "@/components/reading/reading-hero";
import { ReadingTimeline } from "@/components/reading/reading-timeline";
import { BookGrid } from "@/components/reading/book-grid";
import { ReadingHeatmap } from "@/components/reading/reading-heatmap";
import { FavoriteAuthors } from "@/components/reading/favorite-authors";
import { ReadingInsights } from "@/components/reading/reading-insights";
import { ReadingJourney } from "@/components/reading/reading-journey";
import { ReadingStatsSection } from "@/components/reading/reading-stats";
import { getBooks, getReadingData, getReadingStats } from "@/lib/data";

export function ReadingContent() {
  const { favoriteAuthors, insights, journey } = getReadingData();
  const books = getBooks();
  const stats = getReadingStats();

  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-4">
        <ReadingHero stats={stats} />

        <div className="mt-24 space-y-24">
          <ReadingTimeline books={books} />
          <BookGrid books={books} />
          <ReadingHeatmap books={books} />
          <FavoriteAuthors books={books} authors={favoriteAuthors} />
          <ReadingInsights insights={insights} />
          <ReadingJourney journey={journey} />
          <ReadingStatsSection books={books} />
        </div>
      </div>
    </section>
  );
}
