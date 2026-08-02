"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown, Star } from "lucide-react";
import { SectionTitle } from "@/components/shared/section-title";
import { BookCover } from "@/components/reading/book-cover";
import type { Book } from "@/types";

interface ReadingTimelineProps {
  books: Book[];
}

export function ReadingTimeline({ books }: ReadingTimelineProps) {
  const reducedMotion = useReducedMotion();
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const years = useMemo(() => {
    const map = new Map<number, Book[]>();
    books.forEach((book) => {
      if (book.yearRead <= 0) return;
      const list = map.get(book.yearRead) ?? [];
      list.push(book);
      map.set(book.yearRead, list);
    });
    return Array.from(map.entries())
      .sort((a, b) => b[0] - a[0])
      .map(([year, list]) => ({ year, books: list }));
  }, [books]);

  const toggle = (year: number) => {
    setExpanded((prev) => ({ ...prev, [year]: !prev[year] }));
  };

  return (
    <section id="timeline" className="scroll-mt-24">
      <SectionTitle
        label="Timeline"
        title="The Reading Timeline"
        description="Every year, collapsed. Click to expand the books I read that year."
      />

      <div className="relative mx-auto max-w-3xl space-y-3">
        <div className="absolute left-[19px] top-4 bottom-4 w-px bg-border" aria-hidden="true" />

        {years.map(({ year, books: yearBooks }) => {
          const isOpen = expanded[year] ?? year === years[0]?.year;
          const genres = Array.from(new Set(yearBooks.map((b) => b.genre))).join(" · ");

          return (
            <div key={year} className="relative pl-12">
              <div className="absolute left-0 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card">
                <span className="text-sm font-semibold text-accent">{year % 100}</span>
              </div>

              <button
                onClick={() => toggle(year)}
                aria-expanded={isOpen}
                className="group flex w-full items-center justify-between rounded-xl border border-border bg-card px-5 py-4 text-left transition-colors hover:border-accent/30"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-lg font-semibold">{year}</span>
                  <span className="text-sm text-muted-foreground">
                    {yearBooks.length} {yearBooks.length === 1 ? "book" : "books"}
                  </span>
                  <span className="hidden text-xs text-muted-foreground sm:inline">·</span>
                  <span className="hidden text-sm text-muted-foreground sm:inline">{genres}</span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:text-foreground ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                      {yearBooks.map((book, i) => (
                        <motion.li
                          key={book.id}
                          initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          className="flex gap-4 rounded-xl border border-border bg-card p-4"
                        >
                          <div className="h-24 w-16 shrink-0 overflow-hidden rounded-md shadow-md">
                            <BookCover book={book} />
                          </div>
                          <div className="min-w-0">
                            <p className="flex items-center gap-1.5 text-sm font-medium leading-snug">
                              {book.title}
                              {book.favorite && (
                                <Star className="h-3 w-3 shrink-0 fill-accent text-accent" />
                              )}
                            </p>
                            <p className="mt-0.5 text-xs text-muted-foreground">{book.author}</p>
                            <p className="mt-1.5 text-[11px] text-accent-light">{book.genre}</p>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
