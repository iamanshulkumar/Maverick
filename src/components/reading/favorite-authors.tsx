"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown, Star } from "lucide-react";
import { SectionTitle } from "@/components/shared/section-title";
import type { Book, FavoriteAuthor } from "@/types";

interface FavoriteAuthorsProps {
  books: Book[];
  authors: FavoriteAuthor[];
}

export function FavoriteAuthors({ books, authors }: FavoriteAuthorsProps) {
  const reducedMotion = useReducedMotion();
  const [expanded, setExpanded] = useState<string | null>(null);

  const authorsWithBooks = useMemo(
    () =>
      authors.map((author) => ({
        ...author,
        authorBooks: books.filter((b) => b.author === author.name),
      })),
    [books, authors]
  );

  return (
    <section id="authors" className="scroll-mt-24">
      <SectionTitle
        label="Favorite Authors"
        title="Authors I Return To"
        description="The writers whose worlds I keep revisiting. Click to see which of their books I've read."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {authorsWithBooks.map(({ name, stars, authorBooks }) => {
          const isOpen = expanded === name;
          return (
            <div
              key={name}
              className="rounded-xl border border-border bg-card"
            >
              <button
                onClick={() => setExpanded(isOpen ? null : name)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-3 p-5 text-left"
              >
                <div className="min-w-0">
                  <p className="truncate font-semibold">{name}</p>
                  <div className="mt-1 flex items-center gap-0.5" aria-label={`${stars} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        className={`h-3.5 w-3.5 ${
                          s < stars ? "fill-accent text-accent" : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                    {authorBooks.length} {authorBooks.length === 1 ? "book" : "books"}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-2 border-t border-border p-5">
                      {authorBooks.length > 0 ? (
                        authorBooks.map((book) => (
                          <li key={book.id} className="flex items-center justify-between gap-3 text-sm">
                            <span className="line-clamp-1 text-foreground">{book.title}</span>
                            <span className="shrink-0 text-xs text-muted-foreground">
                              {book.yearRead}
                            </span>
                          </li>
                        ))
                      ) : (
                        <li className="text-sm text-muted-foreground">No books logged yet.</li>
                      )}
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
