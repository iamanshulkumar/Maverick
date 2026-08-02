"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, X } from "lucide-react";
import { SectionTitle } from "@/components/shared/section-title";
import { BookCard } from "@/components/reading/book-card";
import { BookDialog } from "@/components/reading/book-dialog";
import { getBookGenres } from "@/lib/data";
import type { Book } from "@/types";

interface BookGridProps {
  books: Book[];
}

export function BookGrid({ books }: BookGridProps) {
  const reducedMotion = useReducedMotion();
  const genres = useMemo(() => getBookGenres(), []);
  const [query, setQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");
  const [selected, setSelected] = useState<Book | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return books.filter((book) => {
      if (activeGenre !== "All" && book.genre !== activeGenre) return false;
      if (!q) return true;
      return [
        book.title,
        book.author,
        book.genre,
        String(book.yearRead),
        ...book.tags,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [books, query, activeGenre]);

  return (
    <section id="library" className="scroll-mt-24">
      <SectionTitle
        label="Library"
        title="The Library"
        description="Every book I've finished. Search, filter by genre, and click any cover for details."
      />

      <div className="sticky top-16 z-30 -mx-4 bg-background/80 px-4 py-3 backdrop-blur-xl">
        <div className="relative mx-auto max-w-xl">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, author, genre, year, or tag..."
            aria-label="Search books"
            className="w-full rounded-full border border-border bg-card py-2.5 pl-10 pr-9 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              aria-pressed={activeGenre === genre}
              className={`relative shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors ${
                activeGenre === genre
                  ? "text-white"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeGenre === genre && (
                <motion.span
                  layoutId="genre-pill"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}
              <span className="relative">{genre}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-4 max-w-xl text-center text-sm text-muted-foreground">
        Showing <span className="font-medium text-foreground">{filtered.length}</span> of{" "}
        {books.length} books
      </p>

      <motion.ul
        layout
        className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((book, i) => (
            <motion.li
              layout
              key={book.id}
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: reducedMotion ? 0 : Math.min(i * 0.02, 0.3) }}
            >
              <BookCard book={book} onSelect={setSelected} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-muted-foreground">No books match your search.</p>
          <button
            onClick={() => {
              setQuery("");
              setActiveGenre("All");
            }}
            className="mt-3 text-sm text-accent hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      <BookDialog
        book={selected}
        books={filtered}
        onSelect={setSelected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
