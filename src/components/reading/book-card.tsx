"use client";

import { Star } from "lucide-react";
import { BookCover } from "@/components/reading/book-cover";
import { cn } from "@/lib/utils";
import type { Book } from "@/types";

interface BookCardProps {
  book: Book;
  onSelect: (book: Book) => void;
}

export function BookCard({ book, onSelect }: BookCardProps) {
  return (
    <button
      onClick={() => onSelect(book)}
      aria-label={`View details for ${book.title}`}
      className="group block w-full rounded-xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="flex gap-4 rounded-xl border border-border bg-card p-3 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent/40 md:block md:overflow-hidden md:p-0">
        <div
          className={cn(
            "relative h-32 w-24 shrink-0 overflow-hidden border border-border shadow-md transition-transform duration-300 md:h-auto md:w-full md:aspect-[2/3] md:rounded-none md:border-0"
          )}
        >
          <BookCover book={book} />

          {book.status === "Reading" && (
            <span className="absolute left-2 top-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-white shadow-sm">
              Reading
            </span>
          )}

          {book.status === "Wishlist" && (
            <span className="absolute left-2 top-2 rounded-full border border-accent/40 bg-background/70 px-2 py-0.5 text-[10px] font-medium text-accent-light backdrop-blur-sm">
              To Read
            </span>
          )}

          {book.favorite && (
            <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-background/70 backdrop-blur-sm">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            </span>
          )}

          <div className="pointer-events-none absolute inset-0 hidden items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:flex">
            <span className="text-xs font-medium text-white">
              {book.genre} · {book.yearRead || "—"}
            </span>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center md:mt-3 md:justify-start md:px-4 md:pb-4">
          <p className="line-clamp-2 text-sm font-semibold leading-snug">
            {book.title}
          </p>

          <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{book.author}</p>

          <p className="mt-0.5 text-xs text-muted-foreground md:hidden">
            {book.genre}
            {book.yearRead > 0 && ` · ${book.yearRead}`}
          </p>

          {book.rating ? (
            <div
              className="mt-2 flex items-center gap-0.5"
              role="img"
              aria-label={`Rated ${book.rating} out of 5`}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < book.rating! ? "fill-accent text-accent" : "text-muted"
                  }`}
                />
              ))}
            </div>
          ) : (
            <span className="mt-2 text-[11px] text-muted-foreground">Unrated</span>
          )}
        </div>
      </div>
    </button>
  );
}
